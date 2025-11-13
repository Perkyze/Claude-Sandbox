// enrich-leads.ts
// Reads leads.csv, checks domain for tech stack, guesses email patterns
// Usage: ts-node enrich-leads.ts input.csv output.csv

import * as fs from 'fs';
import * as csv from 'csv-parser';
import axios from 'axios';
import { createObjectCsvWriter } from 'csv-writer';

interface Lead {
  business_name: string;
  industry?: string;
  city?: string;
  website?: string;
  instagram?: string;
  email_guess?: string;
  tech_stack?: string;
  status?: string;
  notes?: string;
}

/**
 * Detects tech stack by checking homepage HTML
 */
async function detectTechStack(domain: string): Promise<string> {
  try {
    // Ensure domain has protocol
    const url = domain.startsWith('http') ? domain : `https://${domain}`;

    const { data } = await axios.get(url, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const html = data.toLowerCase();

    // Check for common CMS signatures
    if (html.includes('wp-content') || html.includes('wordpress')) return 'WordPress';
    if (html.includes('_next') || html.includes('__next')) return 'Next.js';
    if (html.includes('wix.com') || html.includes('wix-')) return 'Wix';
    if (html.includes('squarespace')) return 'Squarespace';
    if (html.includes('shopify')) return 'Shopify';
    if (html.includes('webflow')) return 'Webflow';

    return 'Unknown';
  } catch (error: any) {
    if (error.code === 'ENOTFOUND' || error.response?.status === 404) {
      return 'No site';
    }
    return 'Error';
  }
}

/**
 * Generates common email patterns for a domain
 */
function guessEmails(domain: string, businessName: string): string[] {
  const cleaned = businessName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ''); // Remove special chars

  const baseDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

  return [
    `info@${baseDomain}`,
    `contact@${baseDomain}`,
    `bonjour@${baseDomain}`,
    `${cleaned}@${baseDomain}`,
    `hello@${baseDomain}`
  ];
}

/**
 * Main enrichment function
 */
async function enrichLeads(inputCsv: string, outputCsv: string) {
  const leads: Lead[] = [];

  console.log(`📖 Reading leads from ${inputCsv}...`);

  // Read CSV
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(inputCsv)
      .pipe(csv())
      .on('data', (row) => leads.push(row))
      .on('end', async () => {
        console.log(`✅ Found ${leads.length} leads. Enriching...\n`);

        // Enrich each lead
        for (let i = 0; i < leads.length; i++) {
          const lead = leads[i];
          console.log(`[${i + 1}/${leads.length}] Processing: ${lead.business_name}`);

          if (lead.website) {
            // Detect tech stack
            lead.tech_stack = await detectTechStack(lead.website);
            console.log(`  Tech stack: ${lead.tech_stack}`);

            // Guess emails
            const emails = guessEmails(lead.website, lead.business_name);
            lead.email_guess = emails[0]; // Use first pattern as primary guess
            console.log(`  Email guess: ${lead.email_guess}`);
          } else {
            lead.tech_stack = 'No website';
            lead.email_guess = '';
            console.log(`  No website provided`);
          }

          // Set default status if not present
          if (!lead.status) {
            lead.status = 'prospect';
          }

          // Small delay to avoid rate limiting
          await new Promise(r => setTimeout(r, 500));
        }

        // Write enriched CSV
        console.log(`\n💾 Writing enriched data to ${outputCsv}...`);

        const csvWriter = createObjectCsvWriter({
          path: outputCsv,
          header: [
            { id: 'business_name', title: 'business_name' },
            { id: 'industry', title: 'industry' },
            { id: 'city', title: 'city' },
            { id: 'website', title: 'website' },
            { id: 'instagram', title: 'instagram' },
            { id: 'email_guess', title: 'email_guess' },
            { id: 'tech_stack', title: 'tech_stack' },
            { id: 'status', title: 'status' },
            { id: 'notes', title: 'notes' }
          ]
        });

        await csvWriter.writeRecords(leads);

        console.log(`\n✅ Enrichment complete! ${leads.length} leads processed.`);
        console.log(`📊 Summary:`);

        // Generate summary stats
        const techStackCounts: Record<string, number> = {};
        leads.forEach(lead => {
          const stack = lead.tech_stack || 'Unknown';
          techStackCounts[stack] = (techStackCounts[stack] || 0) + 1;
        });

        Object.entries(techStackCounts).forEach(([stack, count]) => {
          console.log(`  ${stack}: ${count}`);
        });

        resolve();
      })
      .on('error', reject);
  });
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: ts-node enrich-leads.ts <input.csv> <output.csv>');
    console.error('Example: ts-node enrich-leads.ts outputs/leads/raw.csv outputs/leads/enriched.csv');
    process.exit(1);
  }

  const [inputCsv, outputCsv] = args;

  enrichLeads(inputCsv, outputCsv)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Error:', error.message);
      process.exit(1);
    });
}

export { enrichLeads, detectTechStack, guessEmails };