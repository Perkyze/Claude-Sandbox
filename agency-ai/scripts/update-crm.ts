// update-crm.ts
// Appends new leads or updates status in crm.csv
// Usage: ts-node update-crm.ts <crm.csv> <email> <status> [notes]

import * as fs from 'fs';
import * as csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

type LeadStatus =
  | 'prospect'
  | 'contacted'
  | 'replied'
  | 'qualified'
  | 'proposal_sent'
  | 'won'
  | 'lost';

interface CRMLead {
  email: string;
  business_name?: string;
  first_name?: string;
  status: LeadStatus;
  last_contact: string;
  notes?: string;
}

/**
 * Updates or adds a lead in the CRM
 */
async function updateCRM(
  crmPath: string,
  email: string,
  status: LeadStatus,
  notes?: string,
  businessName?: string,
  firstName?: string
): Promise<void> {
  const leads: CRMLead[] = [];
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  console.log(`📖 Reading CRM from ${crmPath}...`);

  // Read existing CRM
  if (fs.existsSync(crmPath)) {
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(crmPath)
        .pipe(csv())
        .on('data', (row) => leads.push(row as CRMLead))
        .on('end', resolve)
        .on('error', reject);
    });
  }

  // Find existing lead or create new
  const existingIndex = leads.findIndex(l => l.email.toLowerCase() === email.toLowerCase());

  if (existingIndex !== -1) {
    // Update existing lead
    console.log(`✏️  Updating existing lead: ${email}`);
    leads[existingIndex].status = status;
    leads[existingIndex].last_contact = today;
    if (notes) {
      // Append notes instead of replacing
      const existingNotes = leads[existingIndex].notes || '';
      leads[existingIndex].notes = existingNotes
        ? `${existingNotes} | ${notes}`
        : notes;
    }
  } else {
    // Add new lead
    console.log(`➕ Adding new lead: ${email}`);
    leads.push({
      email,
      business_name: businessName || '',
      first_name: firstName || '',
      status,
      last_contact: today,
      notes: notes || ''
    });
  }

  // Write updated CRM
  console.log(`💾 Writing CRM to ${crmPath}...`);

  const csvWriter = createObjectCsvWriter({
    path: crmPath,
    header: [
      { id: 'email', title: 'email' },
      { id: 'business_name', title: 'business_name' },
      { id: 'first_name', title: 'first_name' },
      { id: 'status', title: 'status' },
      { id: 'last_contact', title: 'last_contact' },
      { id: 'notes', title: 'notes' }
    ]
  });

  await csvWriter.writeRecords(leads);

  console.log(`✅ CRM updated! Lead status: ${status}`);

  // Show summary
  console.log(`\n📊 CRM Summary (${leads.length} total leads):`);
  const statusCounts: Record<string, number> = {};
  leads.forEach(lead => {
    statusCounts[lead.status] = (statusCounts[lead.status] || 0) + 1;
  });

  Object.entries(statusCounts).forEach(([status, count]) => {
    console.log(`  ${status}: ${count}`);
  });
}

/**
 * Query CRM for follow-ups (leads contacted 3+ days ago with no reply)
 */
async function queryFollowUps(crmPath: string, daysSince: number = 3): Promise<CRMLead[]> {
  const leads: CRMLead[] = [];

  if (!fs.existsSync(crmPath)) {
    console.warn(`⚠️  CRM file not found: ${crmPath}`);
    return [];
  }

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(crmPath)
      .pipe(csv())
      .on('data', (row) => leads.push(row as CRMLead))
      .on('end', resolve)
      .on('error', reject);
  });

  const today = new Date();
  const followUps = leads.filter(lead => {
    if (lead.status !== 'contacted') return false;

    const lastContact = new Date(lead.last_contact);
    const daysDiff = Math.floor((today.getTime() - lastContact.getTime()) / (1000 * 60 * 60 * 24));

    return daysDiff >= daysSince;
  });

  return followUps;
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error('Usage:');
    console.error('  Update lead: ts-node update-crm.ts <crm.csv> <email> <status> [notes] [business_name] [first_name]');
    console.error('  Query follow-ups: ts-node update-crm.ts <crm.csv> --followups [days]');
    console.error('');
    console.error('Examples:');
    console.error('  ts-node update-crm.ts outputs/leads/crm.csv info@cafebloom.ca contacted "Sent email #1" "Café Bloom" "Sophie"');
    console.error('  ts-node update-crm.ts outputs/leads/crm.csv --followups 3');
    console.error('');
    console.error('Valid statuses: prospect, contacted, replied, qualified, proposal_sent, won, lost');
    process.exit(1);
  }

  const [crmPath, ...rest] = args;

  // Check if querying follow-ups
  if (rest[0] === '--followups') {
    const days = parseInt(rest[1]) || 3;

    queryFollowUps(crmPath, days)
      .then((followUps) => {
        console.log(`\n📋 Follow-ups needed (contacted ${days}+ days ago, no reply):\n`);

        if (followUps.length === 0) {
          console.log('  No follow-ups needed! 🎉');
        } else {
          followUps.forEach((lead, i) => {
            console.log(`${i + 1}. ${lead.business_name || lead.email}`);
            console.log(`   Email: ${lead.email}`);
            console.log(`   Last contact: ${lead.last_contact}`);
            console.log(`   Notes: ${lead.notes || 'None'}\n`);
          });
        }

        process.exit(0);
      })
      .catch((error) => {
        console.error('❌ Error:', error.message);
        process.exit(1);
      });
  } else {
    // Update lead
    const [email, status, notes, businessName, firstName] = rest;

    if (!email || !status) {
      console.error('❌ Error: email and status are required');
      process.exit(1);
    }

    const validStatuses: LeadStatus[] = [
      'prospect',
      'contacted',
      'replied',
      'qualified',
      'proposal_sent',
      'won',
      'lost'
    ];

    if (!validStatuses.includes(status as LeadStatus)) {
      console.error(`❌ Error: Invalid status "${status}"`);
      console.error(`Valid statuses: ${validStatuses.join(', ')}`);
      process.exit(1);
    }

    updateCRM(crmPath, email, status as LeadStatus, notes, businessName, firstName)
      .then(() => process.exit(0))
      .catch((error) => {
        console.error('❌ Error:', error.message);
        process.exit(1);
      });
  }
}

export { updateCRM, queryFollowUps };