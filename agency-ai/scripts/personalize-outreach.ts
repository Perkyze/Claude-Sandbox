// personalize-outreach.ts
// Scrapes homepage, extracts key phrases, generates compliment for cold outreach
// Usage: ts-node personalize-outreach.ts <url> <business_name>

import axios from 'axios';
import * as cheerio from 'cheerio';

interface PersonalizationResult {
  compliment: string;
  painPoint: string;
  industry: string;
}

/**
 * Generates personalized first-line compliment from homepage content
 */
async function generatePersonalization(
  url: string,
  businessName: string
): Promise<PersonalizationResult> {
  try {
    // Ensure URL has protocol
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;

    console.log(`🔍 Analyzing ${fullUrl}...`);

    const { data } = await axios.get(fullUrl, {
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(data);

    // Extract content
    const headline = $('h1').first().text().trim();
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const firstParagraph = $('p').first().text().trim();

    // Detect industry hints
    const bodyText = $('body').text().toLowerCase();
    let industry = 'business';

    if (bodyText.includes('restaurant') || bodyText.includes('menu') || bodyText.includes('réservation')) {
      industry = 'restaurant';
    } else if (bodyText.includes('plomb') || bodyText.includes('électric') || bodyText.includes('rénov')) {
      industry = 'service à domicile';
    } else if (bodyText.includes('esthétique') || bodyText.includes('beauté') || bodyText.includes('spa')) {
      industry = 'clinique';
    }

    // Generate compliment
    let compliment = '';
    if (headline && headline.length > 10 && headline.length < 100) {
      compliment = `j'adore votre approche "${headline.substring(0, 60)}"`;
    } else if (metaDescription && metaDescription.length > 20) {
      const snippet = metaDescription.substring(0, 60);
      compliment = `votre mission "${snippet}..." est vraiment unique`;
    } else if (firstParagraph && firstParagraph.length > 20) {
      compliment = `votre présentation sur votre site est très professionnelle`;
    } else {
      compliment = `j'ai entendu parler de ${businessName} par des collègues dans l'industrie`;
    }

    // Generate pain point based on tech stack
    const html = data.toLowerCase();
    let painPoint = '';

    if (html.includes('wix.com')) {
      painPoint = 'votre site Wix actuel pourrait être plus rapide et mieux optimisé pour Google';
    } else if (html.includes('squarespace')) {
      painPoint = 'votre site Squarespace pourrait bénéficier d\'une personnalisation plus poussée';
    } else if (!html.includes('viewport') || !html.includes('mobile')) {
      painPoint = 'votre site actuel n\'est pas optimisé pour mobile';
    } else {
      painPoint = 'votre site pourrait générer plus de leads avec quelques optimisations SEO';
    }

    console.log(`✅ Personalization generated!`);

    return {
      compliment,
      painPoint,
      industry
    };

  } catch (error: any) {
    console.warn(`⚠️  Could not fetch ${url}:`, error.message);

    // Fallback personalization
    return {
      compliment: `j'ai découvert ${businessName} en cherchant les meilleures options dans votre région`,
      painPoint: 'vous n\'avez pas encore de site web pour capter les clients qui cherchent sur Google',
      industry: 'business'
    };
  }
}

/**
 * Generates full email from template with personalization
 */
function generateEmail(
  businessName: string,
  firstName: string,
  city: string,
  personalization: PersonalizationResult
): string {
  const { compliment, painPoint, industry } = personalization;

  return `Objet: Question rapide sur ${businessName}

Bonjour ${firstName},

Je suis tombé sur ${businessName} en cherchant ${industry} à ${city}—${compliment}.

J'ai remarqué que ${painPoint}. Ça vous coûte probablement des clients qui cherchent sur mobile ou Google.

Je travaille avec des ${industry}s au Québec pour créer des sites rapides, optimisés pour Google, et faciles à gérer (vous pouvez faire les mises à jour vous-même).

Seriez-vous ouvert à un échange de 15 minutes pour voir si ça fait du sens?

Merci,
[Votre nom]
[Agence]
[Téléphone]
[Site web]`;
}

/**
 * Generates LinkedIn/Instagram DM
 */
function generateDM(
  businessName: string,
  firstName: string,
  personalization: PersonalizationResult
): string {
  const { compliment, industry } = personalization;

  return `Salut ${firstName}! 👋

Je suis tombé sur ${businessName} et ${compliment}.

J'aide des ${industry}s au Québec à créer des sites qui convertissent (mobile-first, SEO optimisé, livraison en 10 jours).

Si jamais votre site actuel ne vous donne pas assez de leads, j'aimerais jaser 15 min—sans engagement.

Ça t'intéresse?

[Votre nom]`;
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: ts-node personalize-outreach.ts <url> <business_name> [first_name] [city]');
    console.error('Example: ts-node personalize-outreach.ts cafebloom.ca "Café Bloom" "Sophie" "Montréal"');
    process.exit(1);
  }

  const [url, businessName, firstName = 'Bonjour', city = 'Québec'] = args;

  generatePersonalization(url, businessName)
    .then((result) => {
      console.log('\n📧 EMAIL VERSION:');
      console.log('─'.repeat(60));
      console.log(generateEmail(businessName, firstName, city, result));

      console.log('\n\n💬 DM VERSION (LinkedIn/Instagram):');
      console.log('─'.repeat(60));
      console.log(generateDM(businessName, firstName, result));

      console.log('\n\n📊 PERSONALIZATION DATA:');
      console.log('─'.repeat(60));
      console.log(JSON.stringify(result, null, 2));

      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error:', error.message);
      process.exit(1);
    });
}

export { generatePersonalization, generateEmail, generateDM };