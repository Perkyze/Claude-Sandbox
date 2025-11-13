# Website Build Runbook (7-10 Day Workflow)

**Goal**: Deliver a high-quality, production-ready website on time, on budget, with minimal revisions.

---

## Pre-Build (Before Contract Signed)

### Discovery Call Checklist
- [ ] ICP confirmed (industry, target audience, competitors)
- [ ] Package selected (Starter $2,500 or Pro $4,000)
- [ ] Timeline agreed (7-10 days for Starter, 10-14 for Pro)
- [ ] Deposit collected (50% upfront)

### Contract & Kickoff
- [ ] Contract signed (use PandaDoc or PDF + DocuSign)
- [ ] Deposit received ($1,250 for Starter, $2,000 for Pro)
- [ ] Send client brief questionnaire (`prompts/brief-questionnaire.md`)
- [ ] Create project folder: `outputs/sites/[client-name]/`

---

## Day 1-2: Brief & Planning

### Input from Client
**Send questionnaire** (`prompts/brief-questionnaire.md`) requesting:
- [ ] Business name, tagline, value proposition
- [ ] Pages needed (Accueil, Services, À propos, Contact, etc.)
- [ ] Content: existing text, photos, logo
- [ ] Design references (3 sites they like)
- [ ] Brand colors (hex codes) + logo files (PNG, SVG)
- [ ] Functionalities (contact form, booking, gallery, blog)

### Your Tasks
**Generate Sitemap**:
```bash
npm run generate-sitemap -- outputs/sites/cafe-bloom/brief.json
```

**Output**: `sitemap.md` with:
- Page list + URL structure
- Sections per page (Hero, Services, Testimonials, etc.)
- Component checklist (forms, maps, CTAs)

**Get Client Approval**:
- Share sitemap via Google Doc or PDF
- Request: "Approve this structure before we start coding"
- Allow 1 round of revisions (add/remove pages)

### Stack Decision
**Decision Tree**:
- Client wants to edit themselves → **WordPress**
- Client wants max performance → **Next.js**
- E-commerce < 50 products → **WordPress + WooCommerce**
- Budget < $3k → **WordPress** (faster)
- Custom features → **Next.js**

**Document decision** in `outputs/sites/[client]/project.json`:
```json
{
  "client": "Café Bloom",
  "package": "Pro",
  "stack": "WordPress",
  "pages": ["Accueil", "Menu", "À propos", "Contact"],
  "features": ["contact_form", "google_maps", "booking_system"],
  "deadline": "2025-11-27",
  "status": "in_progress"
}
```

---

## Day 3-5: Development

### Setup Environment
**WordPress Path**:
```bash
bash scripts/scaffold-wp-site.sh cafe-bloom
```
- Creates theme in `outputs/sites/cafe-bloom/wp-content/themes/cafe-bloom/`
- Includes: `style.css`, `index.php`, `header.php`, `footer.php`, `functions.php`
- Install locally (XAMPP, Local by Flywheel, or staging server)

**Next.js Path**:
```bash
npm run scaffold-nextjs -- outputs/sites/cafe-bloom/brief.json
```
- Creates Next.js 14 app in `outputs/sites/cafe-bloom/`
- Generates pages from sitemap
- Includes Hero, ContactForm components
- Tailwind CSS pre-configured

### Build Pages

**For each page in sitemap**:
1. **Add content** (client-provided or placeholder)
2. **Configure SEO**:
   - Title tag (50-60 chars)
   - Meta description (150-160 chars)
   - Open Graph tags (for social sharing)
3. **Add components**:
   - Hero section (H1 + CTA)
   - Service cards or feature list
   - Testimonials (if available)
   - Contact form or CTA block

**WordPress**:
- Use Elementor or Gutenberg blocks
- Install plugins: Contact Form 7, Yoast SEO, WP Rocket (caching)
- Create pages from sitemap, add content

**Next.js**:
- Edit page.tsx files in `app/[page-slug]/`
- Import components from `components/`
- Configure metadata in each page

### Configure Functionality

**Contact Form**:
- WordPress: Contact Form 7 (free) or WPForms
- Next.js: Custom form → API route → email (Resend, SendGrid, Nodemailer)

**Google Maps**:
- Embed iframe or use Google Maps API
- Set marker to business address

**Booking System** (Pro package):
- WordPress: Amelia or Calendly embed
- Next.js: Calendly embed or Cal.com integration

**Blog** (if requested):
- WordPress: Built-in, just enable
- Next.js: Markdown files in `content/` folder + dynamic routes

### Daily Check-In with Client
**Send update** (Slack, email, or Loom video):
- "Here's what I built today: [screenshot]"
- "Tomorrow I'll work on: [next section]"
- "Any feedback or content ready?"

---

## Day 6-7: Content & Styling

### Add Client Content
**Text**:
- Replace lorem ipsum with client-provided copy
- If client doesn't provide: write basic copy (charge $150/page if out of scope)

**Images**:
- Optimize photos (WebP format, max 1920px width)
- Add alt text for SEO + accessibility
- Use placeholders (Unsplash) if client delays photos

**Logo & Branding**:
- Add logo to header (SVG preferred)
- Apply brand colors (CSS variables or Tailwind config)
- Check contrast ratio (4.5:1 minimum for WCAG AA)

### Styling & Responsive Design
**Mobile-first checklist**:
- [ ] Test on 375px (iPhone SE)
- [ ] Test on 768px (iPad)
- [ ] Test on 1440px (desktop)
- [ ] Touch targets ≥ 44x44px
- [ ] No horizontal scroll
- [ ] Readable font size (16px min)

**WordPress**:
- Elementor responsive mode (mobile/tablet/desktop views)
- Test on actual devices (Chrome DevTools)

**Next.js**:
- Tailwind responsive utilities (sm:, md:, lg:)
- Test with `npm run dev` + DevTools

---

## Day 8-9: QA & Revisions

### Pre-Launch QA Checklist

**Functionality**:
- [ ] All links work (internal + external)
- [ ] Contact form submits (test email receipt)
- [ ] Booking system works (if applicable)
- [ ] Navigation menu works on mobile
- [ ] Footer has contact info + social links

**Performance** (run Lighthouse audit):
- [ ] Performance score ≥ 90
- [ ] LCP < 2.5s (optimize hero image)
- [ ] FID < 100ms (minimize JS)
- [ ] CLS < 0.1 (set image dimensions)

**SEO**:
- [ ] Unique title + meta description per page
- [ ] H1 tag on every page (only one)
- [ ] Alt text on all images
- [ ] Sitemap.xml generated
- [ ] robots.txt configured
- [ ] Schema.org LocalBusiness JSON-LD added

**Accessibility** (WCAG 2.1 AA):
- [ ] Contrast ratio ≥ 4.5:1 (use WebAIM checker)
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Form labels associated with inputs
- [ ] ARIA labels on buttons/links

**Mobile**:
- [ ] Responsive on all screen sizes
- [ ] Touch targets spaced properly
- [ ] No overlap or layout shifts

### Share Staging URL with Client
**Email**:
> Bonjour {{name}},
>
> Votre site est prêt pour révision! 🎉
>
> 👉 Staging URL: https://staging.votredomaine.com
>
> **Veuillez vérifier**:
> - Contenu (texte, photos)
> - Fonctionnalités (formulaire, réservation)
> - Design (couleurs, mise en page)
>
> **Revisions incluses**: 2 rounds (changements majeurs de design = frais additionnels)
>
> Envoyez-moi vos commentaires d'ici vendredi. Lancement prévu: lundi prochain!
>
> Merci,
> {{your_name}}

### Handle Revisions
**Included** (2 rounds):
- Content tweaks (typo fixes, text changes)
- Color adjustments
- Minor layout shifts

**Out of scope** (quote separately):
- New pages not in original brief
- Major design overhaul
- New features (e.g., adding e-commerce)

**Track changes** in `outputs/sites/[client]/revisions.md`:
```markdown
## Revision Round 1 (2025-11-20)
- [x] Change hero button color to blue
- [x] Fix typo on About page
- [ ] Add 3rd testimonial (waiting for content)

## Revision Round 2 (2025-11-22)
- [x] Adjust mobile menu spacing
- [x] Update contact email
```

---

## Day 10: Launch

### Pre-Launch Checklist
- [ ] Client approved final staging version
- [ ] Domain DNS configured (A record or CNAME)
- [ ] SSL certificate installed (HTTPS)
- [ ] Google Analytics 4 setup
- [ ] Google Search Console verified
- [ ] Submit sitemap to Search Console
- [ ] Backup plugin configured (UpdraftPlus, BackupBuddy)
- [ ] Security plugin installed (Wordfence, Sucuri)
- [ ] Caching enabled (WP Rocket, Cloudflare)

### Deploy to Production

**WordPress**:
1. Export from staging (All-in-One WP Migration plugin)
2. Import to production server (hosting: Hostinger, SiteGround, O2Switch)
3. Update site URL in Settings → General
4. Test all functionality again

**Next.js**:
1. Push to GitHub
2. Deploy to Vercel/Netlify:
   ```bash
   git push origin main
   vercel --prod
   ```
3. Configure custom domain in Vercel dashboard
4. Enable HTTPS (automatic with Vercel)

### Post-Launch Verification
**Test on live site**:
- [ ] Homepage loads correctly
- [ ] All pages accessible
- [ ] Forms submit (send test email)
- [ ] SSL certificate active (🔒 in browser)
- [ ] Mobile responsive
- [ ] Google Analytics tracking (check Real-Time reports)

### Client Training
**Record Loom video** (5-10 min):
- How to edit pages (WordPress Editor or Elementor)
- How to add blog posts
- How to update contact info
- How to view form submissions
- When to call for help (vs. DIY edits)

**Send credentials** (via LastPass, 1Password, or encrypted email):
- WordPress admin login (or CMS access)
- Hosting control panel
- Google Analytics access (read-only)
- Domain registrar (if you manage)

---

## Post-Launch (30-Day Support)

### Included in Package
- Bug fixes (broken links, display issues)
- Minor content updates (< 1 hour total)
- WordPress/plugin updates (if applicable)
- Email support (reply within 24 hours)

### Not Included (Quote Separately)
- New pages or features
- Major design changes
- Content writing (>1 hour)
- Third-party integrations

### Request Testimonial
**Email** (7 days after launch):
> Bonjour {{name}},
>
> Ça fait maintenant une semaine que votre site est en ligne—comment ça se passe?
>
> Si vous êtes satisfait du travail, j'aimerais beaucoup avoir un témoignage:
> 1. **Google Review**: [link] (aide mon référencement local!)
> 2. **Témoignage écrit**: 2-3 phrases sur votre expérience (je l'afficherai sur mon site avec votre permission)
>
> Merci encore pour votre confiance!
>
> {{your_name}}

### Upsell Care Plan
**Email** (30 days after launch):
> Bonjour {{name}},
>
> Votre période de support gratuit (30 jours) se termine bientôt. Voulez-vous continuer avec notre **Care Plan** à $200/mois?
>
> **Inclus**:
> - Mises à jour mensuelles (WordPress, plugins, sécurité)
> - Backups automatiques (quotidiens)
> - 1 heure d'éditions par mois
> - Monitoring uptime (notification si le site tombe)
> - Support prioritaire (réponse < 12 heures)
>
> Intéressé? Répondez "Oui" et je vous envoie le contrat.
>
> {{your_name}}

---

## Common Issues & Troubleshooting

### Issue: Client Delays Content
**Solution**:
- Use placeholder text + Unsplash images
- Launch with "Coming Soon" on incomplete sections
- Charge rush fee if delay pushes past deadline

### Issue: Scope Creep ("Can you add just one more thing?")
**Solution**:
- Reference change request policy (`workflows/change-request-policy.md`)
- Estimate time: <30 min = included, >30 min = quote ($100/hr)
- Get written approval before proceeding

### Issue: Client Unhappy with Design
**Solution**:
- Review original brief + approved sitemap (did they approve this?)
- Offer 1 additional revision round (beyond included 2) for $300
- If fundamental disagreement: refund deposit, part ways professionally

### Issue: Site Not Ranking on Google
**Expectation management**:
- SEO takes 3-6 months to show results
- Basic on-page SEO is included (titles, meta, sitemap)
- Advanced SEO (content strategy, link building) is separate service
- Set up Google Search Console, submit sitemap, be patient

---

## Build Workflow Summary

| Day | Milestone | Deliverable | Client Action |
|-----|-----------|-------------|---------------|
| 1-2 | Brief & Planning | Sitemap + wireframes | Approve structure |
| 3-5 | Development | Staging site (70% done) | Provide content |
| 6-7 | Content & Styling | Staging site (100% done) | Review + feedback |
| 8-9 | QA & Revisions | Final staging version | Final approval |
| 10 | Launch | Live site | Pay final 50% |

**Total time**: 7-10 days (Starter), 10-14 days (Pro)