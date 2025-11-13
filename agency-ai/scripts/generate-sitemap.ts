// generate-sitemap.ts
// Reads brief JSON, outputs sitemap markdown + component checklist
// Usage: ts-node generate-sitemap.ts <brief.json> [output.md]

import * as fs from 'fs';
import * as path from 'path';

interface Brief {
  business_name: string;
  industry: string;
  pages: string[];
  features: string[];
  goals?: string[];
}

/**
 * Auto-suggests sections based on page type
 */
function suggestSections(pageName: string, industry: string): string[] {
  const lowerPage = pageName.toLowerCase();

  // Homepage
  if (lowerPage.includes('accueil') || lowerPage.includes('home')) {
    return [
      'Hero (titre + sous-titre + CTA)',
      'Services ou offres (3-4 cartes avec icônes)',
      'À propos bref (1-2 paragraphes + photo)',
      'Témoignages (2-3 clients)',
      'CTA final (formulaire ou Calendly)',
      'Footer (coordonnées + réseaux sociaux)'
    ];
  }

  // Services or Menu
  if (lowerPage.includes('service') || lowerPage.includes('menu')) {
    if (industry.toLowerCase().includes('restaurant')) {
      return [
        'Liste complète du menu (sections: entrées, plats, desserts)',
        'Photos des plats signature',
        'Informations allergènes / diététiques',
        'CTA réservation'
      ];
    }
    return [
      'Liste détaillée des services',
      'Tarification (si applicable)',
      'Processus ou déroulement',
      'FAQ',
      'CTA contact'
    ];
  }

  // About
  if (lowerPage.includes('propos') || lowerPage.includes('about')) {
    return [
      'Histoire de l\'entreprise',
      'Mission et valeurs',
      'Équipe (photos + bios courtes)',
      'Pourquoi nous choisir',
      'CTA contact'
    ];
  }

  // Portfolio / Gallery
  if (lowerPage.includes('portfolio') || lowerPage.includes('galerie') || lowerPage.includes('gallery')) {
    return [
      'Galerie photos (grille ou slider)',
      'Catégories / filtres (si applicable)',
      'Descriptions courtes',
      'CTA pour projet'
    ];
  }

  // Testimonials
  if (lowerPage.includes('témoignage') || lowerPage.includes('testimonial') || lowerPage.includes('avis')) {
    return [
      'Liste de témoignages clients',
      'Photos + noms + notes (étoiles)',
      'CTA pour avis Google',
      'Logos clients (si B2B)'
    ];
  }

  // Blog
  if (lowerPage.includes('blog') || lowerPage.includes('actualité')) {
    return [
      'Liste d\'articles (grille ou liste)',
      'Filtres par catégorie',
      'Barre de recherche',
      'CTA newsletter'
    ];
  }

  // FAQ
  if (lowerPage.includes('faq') || lowerPage.includes('question')) {
    return [
      'Questions fréquentes (accordéon)',
      'Sections par catégorie',
      'CTA contact si question non répondue'
    ];
  }

  // Contact
  if (lowerPage.includes('contact')) {
    return [
      'Formulaire de contact (nom, email, téléphone, message)',
      'Carte Google Maps (localisation)',
      'Coordonnées (adresse, téléphone, email, heures)',
      'Liens réseaux sociaux'
    ];
  }

  // Booking / Reservation
  if (lowerPage.includes('réservation') || lowerPage.includes('booking') || lowerPage.includes('rendez-vous')) {
    return [
      'Système de réservation intégré (Calendly, Amelia, ou custom)',
      'Sélection date + heure',
      'Informations client (nom, email, tel)',
      'Confirmation automatique'
    ];
  }

  // Default
  return [
    'Titre de page (H1)',
    'Contenu principal (texte + images)',
    'CTA vers autre page'
  ];
}

/**
 * Generates sitemap markdown from brief
 */
function generateSitemap(brief: Brief): string {
  let sitemap = `# Site Map — ${brief.business_name}\n\n`;

  sitemap += `**Industrie**: ${brief.industry}\n`;
  sitemap += `**Nombre de pages**: ${brief.pages.length}\n\n`;

  sitemap += `---\n\n`;

  // Generate page sections
  brief.pages.forEach((page, i) => {
    const slug = page
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    sitemap += `## ${i + 1}. ${page}\n`;
    sitemap += `**URL**: /${slug === 'accueil' ? '' : slug}\n`;
    sitemap += `**Sections**:\n`;

    // Auto-suggest sections
    const sections = suggestSections(page, brief.industry);
    sections.forEach(section => {
      sitemap += `- ${section}\n`;
    });

    sitemap += `\n`;
  });

  sitemap += `---\n\n`;

  // Component checklist
  sitemap += `## Components Checklist\n\n`;
  sitemap += `**Fonctionnalités demandées**:\n`;
  brief.features.forEach(feature => {
    sitemap += `- [ ] ${feature}\n`;
  });

  sitemap += `\n**Composants standard à créer**:\n`;
  sitemap += `- [ ] Header / Navigation\n`;
  sitemap += `- [ ] Footer\n`;
  sitemap += `- [ ] Hero section\n`;
  sitemap += `- [ ] CTA buttons\n`;
  sitemap += `- [ ] Card components (services, témoignages)\n`;

  if (brief.features.some(f => f.toLowerCase().includes('formulaire') || f.toLowerCase().includes('contact'))) {
    sitemap += `- [ ] Formulaire de contact\n`;
  }

  if (brief.features.some(f => f.toLowerCase().includes('galerie') || f.toLowerCase().includes('portfolio'))) {
    sitemap += `- [ ] Galerie photos / Portfolio grid\n`;
  }

  if (brief.features.some(f => f.toLowerCase().includes('témoignage') || f.toLowerCase().includes('avis'))) {
    sitemap += `- [ ] Composant témoignages\n`;
  }

  if (brief.features.some(f => f.toLowerCase().includes('réservation') || f.toLowerCase().includes('booking'))) {
    sitemap += `- [ ] Système de réservation\n`;
  }

  sitemap += `\n---\n\n`;

  // SEO checklist
  sitemap += `## SEO Checklist\n\n`;
  brief.pages.forEach(page => {
    sitemap += `### ${page}\n`;
    sitemap += `- [ ] Titre unique (50-60 chars)\n`;
    sitemap += `- [ ] Meta description (150-160 chars)\n`;
    sitemap += `- [ ] H1 tag\n`;
    sitemap += `- [ ] Alt text sur toutes les images\n\n`;
  });

  sitemap += `**Global SEO**:\n`;
  sitemap += `- [ ] Schema.org LocalBusiness JSON-LD\n`;
  sitemap += `- [ ] Sitemap.xml généré\n`;
  sitemap += `- [ ] robots.txt configuré\n`;
  sitemap += `- [ ] Favicon ajouté\n`;
  sitemap += `- [ ] Open Graph tags (Facebook/LinkedIn)\n\n`;

  return sitemap;
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error('Usage: ts-node generate-sitemap.ts <brief.json> [output.md]');
    console.error('Example: ts-node generate-sitemap.ts outputs/sites/cafe-bloom/brief.json outputs/sites/cafe-bloom/sitemap.md');
    process.exit(1);
  }

  const [briefPath, outputPath] = args;

  if (!fs.existsSync(briefPath)) {
    console.error(`❌ Error: Brief file not found: ${briefPath}`);
    process.exit(1);
  }

  try {
    console.log(`📖 Reading brief from ${briefPath}...`);
    const briefJson = fs.readFileSync(briefPath, 'utf-8');
    const brief: Brief = JSON.parse(briefJson);

    console.log(`✅ Generating sitemap for ${brief.business_name}...`);
    const sitemap = generateSitemap(brief);

    // Determine output path
    const finalOutputPath = outputPath || path.join(
      path.dirname(briefPath),
      'sitemap.md'
    );

    // Write sitemap
    fs.writeFileSync(finalOutputPath, sitemap);

    console.log(`\n✅ Sitemap generated at ${finalOutputPath}`);
    console.log(`\n📄 Preview:\n`);
    console.log('─'.repeat(60));
    console.log(sitemap.substring(0, 500) + '...');
    console.log('─'.repeat(60));

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

export { generateSitemap, suggestSections };