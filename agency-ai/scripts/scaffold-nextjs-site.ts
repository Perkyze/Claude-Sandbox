// scaffold-nextjs-site.ts
// Creates Next.js 14 App Router project with Tailwind + starter pages
// Usage: ts-node scaffold-nextjs-site.ts <brief.json>

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface SiteConfig {
  business_name: string;
  industry: string;
  pages: string[];
  features: string[];
}

/**
 * Converts French page name to slug
 */
function pageToSlug(pageName: string): string {
  return pageName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Generates page.tsx template
 */
function generatePageTemplate(pageName: string, businessName: string): string {
  const cleanName = pageName.replace(/[^a-zA-Z0-9]/g, '');

  return `export default function ${cleanName}Page() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
        ${pageName}
      </h1>
      <p className="text-gray-600 text-lg">
        Contenu de la page ${pageName} pour ${businessName} à venir.
      </p>
    </main>
  );
}

export const metadata = {
  title: '${pageName} | ${businessName}',
  description: 'Page ${pageName} de ${businessName}',
};
`;
}

/**
 * Scaffolds Next.js site
 */
function scaffoldNextJSSite(config: SiteConfig, outputBaseDir: string) {
  const slug = config.business_name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
  const projectPath = path.join(outputBaseDir, slug);

  console.log(`🚀 Creating Next.js site: ${config.business_name}`);
  console.log(`📁 Project path: ${projectPath}\n`);

  // Create Next.js app with Tailwind
  console.log('📦 Running create-next-app (this may take a minute)...');

  try {
    execSync(
      `npx create-next-app@latest ${projectPath} --typescript --tailwind --app --no-src-dir --import-alias "@/*" --use-npm`,
      { stdio: 'inherit', cwd: process.cwd() }
    );
  } catch (error) {
    console.error('❌ Error creating Next.js app');
    throw error;
  }

  console.log('\n✅ Next.js app created\n');

  // Generate pages from config
  console.log('📄 Generating pages...');

  config.pages.forEach(page => {
    const slug = pageToSlug(page);

    // Skip home page (already exists as app/page.tsx)
    if (slug === 'accueil' || slug === 'home' || slug === '') {
      console.log(`  Skipping ${page} (using default app/page.tsx)`);
      return;
    }

    const pagePath = path.join(projectPath, 'app', slug, 'page.tsx');

    fs.mkdirSync(path.dirname(pagePath), { recursive: true });
    fs.writeFileSync(pagePath, generatePageTemplate(page, config.business_name));

    console.log(`  ✅ Created: app/${slug}/page.tsx`);
  });

  // Update homepage (app/page.tsx)
  console.log('\n📝 Updating homepage...');

  const homepageContent = `import Hero from '@/components/Hero';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main>
      <Hero
        title="Bienvenue chez ${config.business_name}"
        subtitle="Votre partenaire de confiance pour ${config.industry}"
      />

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* TODO: Add service cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Service 1</h3>
            <p className="text-gray-600">Description du service 1</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Service 2</h3>
            <p className="text-gray-600">Description du service 2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Service 3</h3>
            <p className="text-gray-600">Description du service 3</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contactez-nous</h2>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}

export const metadata = {
  title: '${config.business_name} | ${config.industry}',
  description: 'Bienvenue chez ${config.business_name}',
};
`;

  fs.writeFileSync(path.join(projectPath, 'app', 'page.tsx'), homepageContent);
  console.log('  ✅ Updated app/page.tsx');

  // Create components directory
  console.log('\n🧩 Creating components...');

  const componentsDir = path.join(projectPath, 'components');
  fs.mkdirSync(componentsDir, { recursive: true });

  // Hero component
  fs.writeFileSync(
    path.join(componentsDir, 'Hero.tsx'),
    `export default function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
        <p className="text-xl md:text-2xl mb-8">{subtitle}</p>
        <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition">
          Commencer
        </button>
      </div>
    </section>
  );
}
`
  );
  console.log('  ✅ Created Hero.tsx');

  // ContactForm component
  fs.writeFileSync(
    path.join(componentsDir, 'ContactForm.tsx'),
    `'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Send to API route (e.g., /api/contact)
    // For now, just simulate success
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>

      {status === 'success' && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg">
          ✅ Merci! Nous vous contacterons bientôt.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          ❌ Une erreur s'est produite. Veuillez réessayer.
        </div>
      )}
    </form>
  );
}
`
  );
  console.log('  ✅ Created ContactForm.tsx');

  // Create README
  console.log('\n📖 Creating documentation...');

  const readmeContent = `# ${config.business_name}

Website for **${config.business_name}** (${config.industry}).

## Getting Started

### Development
\`\`\`bash
cd ${slug}
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

## Pages

${config.pages.map(page => `- **${page}**: /${pageToSlug(page) === 'accueil' ? '' : pageToSlug(page)}`).join('\n')}

## Features

${config.features.map(f => `- ${f}`).join('\n')}

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React**

## Customization

### Colors
Edit \`tailwind.config.ts\` to customize colors:
\`\`\`ts
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',
      secondary: '#1e40af',
    }
  }
}
\`\`\`

### Components
- \`components/Hero.tsx\`: Homepage hero section
- \`components/ContactForm.tsx\`: Contact form (TODO: connect to API)

## TODO

- [ ] Add content to all pages
- [ ] Configure SEO metadata
- [ ] Set up contact form API route
- [ ] Add Google Analytics
- [ ] Optimize images (use next/image)
- [ ] Add Schema.org JSON-LD for SEO

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Deploy (automatic)

### Netlify
1. Push code to GitHub
2. Import project on [netlify.com](https://netlify.com)
3. Build command: \`npm run build\`
4. Publish directory: \`.next\`

## Support

For issues or customizations, contact: [votre-email@example.com]
`;

  fs.writeFileSync(path.join(projectPath, 'README.md'), readmeContent);
  console.log('  ✅ Created README.md');

  // Success message
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Next.js site scaffolded successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`📁 Location: ${projectPath}\n`);
  console.log('📋 Next steps:');
  console.log(`1. cd ${slug}`);
  console.log('2. npm install (if not done)');
  console.log('3. npm run dev');
  console.log('4. Open http://localhost:3000');
  console.log('5. Customize content in app/ and components/');
  console.log('\n📖 Full instructions: README.md\n');
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error('Usage: ts-node scaffold-nextjs-site.ts <brief.json>');
    console.error('Example: ts-node scaffold-nextjs-site.ts outputs/sites/cafe-bloom/brief.json');
    process.exit(1);
  }

  const [briefPath] = args;

  if (!fs.existsSync(briefPath)) {
    console.error(`❌ Error: Brief file not found: ${briefPath}`);
    process.exit(1);
  }

  try {
    const briefJson = fs.readFileSync(briefPath, 'utf-8');
    const config: SiteConfig = JSON.parse(briefJson);

    const outputBaseDir = path.join(process.cwd(), 'outputs', 'sites');
    fs.mkdirSync(outputBaseDir, { recursive: true });

    scaffoldNextJSSite(config, outputBaseDir);

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

export { scaffoldNextJSSite, pageToSlug };