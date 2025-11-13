# Agency AI — Website-Building Agency Operating System

**AI-powered automation system for running a profitable website-building agency in Québec, Canada.**

This repository contains agents, workflows, scripts, and templates to help you:
1. **Find customers** (lead gen → outreach → qualification → booked calls)
2. **Build websites** (brief → design → development → QA → launch)

Designed for **French-speaking Québec market**, targeting local service businesses (restaurants, home services, health/wellness).

---

## 🎯 Quick Start (Run This Today)

### Prerequisites
- Node.js 18+ and npm
- Git (optional, for version control)
- Basic understanding of HTML/CSS/JavaScript

### Setup (5 minutes)

```bash
# 1. Clone or download this repo
cd agency-ai

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your agency info

# 4. Test scripts
npm run personalize -- cafebloom.ca "Café Bloom"
```

You're ready! 🚀

---

## 📂 Repository Structure

```
agency-ai/
├── agents/                      # AI agent prompts (orchestrator, prospecting, builder)
├── workflows/                   # SOPs (lead-gen, sales call, build runbook, change policy)
├── prompts/                     # Templates (ICP, outreach emails, brief questionnaire)
├── scripts/                     # Automation scripts (TypeScript)
│   ├── enrich-leads.ts          # Domain → email + tech stack detection
│   ├── personalize-outreach.ts  # Homepage → personalized email/DM
│   ├── update-crm.ts            # CSV-based CRM management
│   ├── generate-sitemap.ts      # Brief → sitemap + component checklist
│   ├── scaffold-wp-site.sh      # WordPress theme generator (Bash)
│   └── scaffold-nextjs-site.ts  # Next.js project generator
├── outputs/
│   ├── leads/                   # CSV exports (leads, CRM)
│   └── sites/                   # Generated website projects
├── package.json                 # Node.js dependencies
├── tsconfig.json                # TypeScript configuration
├── .env.example                 # Environment variables template
└── README.md                    # You are here!
```

---

## 🤖 AI Agents

### Orchestrator Agent
**Purpose**: Routes tasks to specialized agents, maintains state (CRM + projects), coordinates workflows.

**Usage**: (With Claude Code or custom Claude integration)
```
Use agents/orchestrator.md as system prompt for main conversation.
```

### Prospecting Agent
**Purpose**: Lead generation, outreach personalization, CRM updates.

**Usage**:
```
"Find me 50 restaurant leads in Montreal"
"Write cold email for Café Bloom"
"Query follow-ups from CRM (3+ days old)"
```

### Builder Agent
**Purpose**: Website build workflow (brief → sitemap → code → QA → launch).

**Usage**:
```
"Create sitemap for approved Café Bloom brief"
"Scaffold WordPress site for Plomberie Éco"
"Generate QA checklist for staging site"
```

---

## 🛠️ Scripts & Automation

### 1. Enrich Leads
**Detects tech stack, guesses email patterns**

```bash
# Input: CSV with business_name, website
# Output: Enriched CSV with email_guess, tech_stack

npm run enrich -- outputs/leads/raw.csv outputs/leads/enriched.csv
```

**Example input** (`raw.csv`):
```csv
business_name,website
Café Bloom,cafebloom.ca
Plomberie Éco,
```

**Example output** (`enriched.csv`):
```csv
business_name,website,email_guess,tech_stack
Café Bloom,cafebloom.ca,info@cafebloom.ca,WordPress
Plomberie Éco,,,No website
```

---

### 2. Personalize Outreach
**Scrapes homepage, generates personalized email/DM**

```bash
npm run personalize -- cafebloom.ca "Café Bloom" "Sophie" "Montréal"
```

**Output**:
- Email version (cold outreach)
- DM version (LinkedIn/Instagram)
- Personalization data (compliment, pain point, industry)

---

### 3. Update CRM
**Add/update leads in CSV-based CRM**

```bash
# Add or update lead
npm run crm-update -- outputs/leads/crm.csv info@cafebloom.ca contacted "Sent email #1" "Café Bloom" "Sophie"

# Query follow-ups (contacted 3+ days ago, no reply)
npm run crm-update -- outputs/leads/crm.csv --followups 3
```

**CRM Statuses**:
- `prospect` → `contacted` → `replied` → `qualified` → `proposal_sent` → `won` / `lost`

---

### 4. Generate Sitemap
**Converts brief JSON → sitemap markdown + component checklist**

```bash
npm run generate-sitemap -- outputs/sites/cafe-bloom/brief.json outputs/sites/cafe-bloom/sitemap.md
```

**Input**: `brief.json` (see `outputs/sites/brief-template.json`)

**Output**: Markdown sitemap with:
- Page structure (URLs, sections per page)
- Component checklist (Hero, ContactForm, etc.)
- SEO checklist (title tags, meta descriptions, schema)

---

### 5. Scaffold WordPress Site
**Generates WordPress theme with Tailwind CSS**

```bash
bash scripts/scaffold-wp-site.sh cafe-bloom
```

**Output** (in `outputs/sites/cafe-bloom/`):
- Theme files: `style.css`, `functions.php`, `header.php`, `footer.php`, `index.php`, `page.php`, `single.php`
- Tailwind CSS (CDN for development)
- Mobile-responsive navigation
- README with setup instructions

**Next steps**:
1. Copy to WordPress `wp-content/themes/` folder
2. Activate theme in WP admin
3. Install plugins: Contact Form 7, Yoast SEO, WP Rocket

---

### 6. Scaffold Next.js Site
**Generates Next.js 14 App Router project**

```bash
npm run scaffold-nextjs -- outputs/sites/cafe-bloom/brief.json
```

**Output** (in `outputs/sites/cafe-bloom/`):
- Next.js 14 + TypeScript + Tailwind
- Pages generated from brief (Accueil, Services, Contact, etc.)
- Components: Hero, ContactForm
- README with deployment instructions (Vercel, Netlify)

**Next steps**:
1. `cd outputs/sites/cafe-bloom`
2. `npm install`
3. `npm run dev`
4. Customize content in `app/` and `components/`

---

## 📋 Workflows & SOPs

### Lead Generation Cadence
**Weekly prospecting workflow (6 hrs/week)**

**File**: [workflows/lead-gen-cadence.md](workflows/lead-gen-cadence.md)

**Monday** (2 hrs):
- Build 50-lead list (Google Maps, Instagram, LinkedIn)
- Enrich with `enrich-leads.ts`

**Wednesday** (2 hrs):
- Personalize 25 emails/DMs
- Send outreach

**Friday** (2 hrs):
- Follow-up on non-responders
- Update CRM
- Review metrics

**Goal**: 2+ discovery calls booked/week

---

### Sales Call Script
**15-minute discovery call template**

**File**: [workflows/sales-call-script.md](workflows/sales-call-script.md)

**Structure**:
1. **Opener** (2 min): Build rapport, confirm pain point
2. **Qualify** (5 min): Budget, timeline, decision-maker
3. **Pitch** (5 min): Present package, show portfolio
4. **Next steps** (3 min): Send proposal or schedule follow-up

**Post-call**: Send proposal within 4 hours

---

### Build Runbook
**7-10 day website build workflow**

**File**: [workflows/build-runbook.md](workflows/build-runbook.md)

**Timeline**:
- **Day 1-2**: Brief intake → sitemap approval
- **Day 3-5**: Development (scaffold + content)
- **Day 6-7**: Styling + responsive design
- **Day 8-9**: QA + client revisions
- **Day 10**: Launch + training

**Deliverables**:
- Live site (HTTPS, domain configured)
- Training video (Loom, 5-10 min)
- Credentials (WordPress, hosting, analytics)

---

### Change Request Policy
**Scope management to protect margins**

**File**: [workflows/change-request-policy.md](workflows/change-request-policy.md)

**Included**:
- 2 rounds of design revisions
- Bug fixes
- Minor content updates (<1 hr)

**Out of scope** (quote separately at $100/hr):
- Major design changes after approval
- New pages beyond agreed count
- Content writing
- Complex features

**Process**: Estimate → Get approval → Document in change-orders.md → Bill with final payment

---

## 📧 Outreach Templates (French)

### Cold Email Sequence (3 touches)

**File**: [prompts/outreach-templates-fr.md](prompts/outreach-templates-fr.md)

**Email #1** (Day 0):
```
Objet: Question rapide sur {{business_name}}

Bonjour {{first_name}},

Je suis tombé sur {{business_name}} en cherchant {{industry}} à {{city}}—{{compliment}}.

J'ai remarqué que {{pain_point}}. Ça vous coûte probablement des clients qui cherchent sur mobile.

Je travaille avec des {{industry}} au Québec pour créer des sites rapides, optimisés Google, et faciles à gérer.

Seriez-vous ouvert à un échange de 15 minutes?

Merci,
{{your_name}}
```

**Email #2** (Day +3): Portfolio + social proof

**Email #3** (Day +7): Final touch + Calendly link

**Target reply rate**: 5-10% (email), 20-30% (LinkedIn/Instagram DM)

---

## 💰 Pricing & Packages

### Starter Package — $2,500 CAD
- 4 pages (Accueil, Services, À propos, Contact)
- Mobile-responsive design
- Contact form + Google Maps
- Basic SEO (titles, meta, sitemap)
- WordPress (client can self-edit)
- 30 days post-launch support
- **Timeline**: 7-10 days

### Pro Package — $4,000 CAD
- Everything in Starter, PLUS:
- 6 pages (2 additional)
- Online booking system (Amelia/Calendly)
- Blog setup + 3 demo posts
- Advanced SEO (Schema.org, Google Business Profile)
- 1-hour training video
- **Timeline**: 10-14 days

### Care Plan — $200/month
- Monthly WordPress/plugin updates
- Daily backups
- 1 hour of content edits/month
- Uptime monitoring
- Priority support (<12 hrs response)

**Revenue Math** (10k/month goal):
- Option A: 4 Starter sites/month = $10k
- Option B: 2 Pro sites + 10 Care Plans = $10k
- **Optimal**: 1 Pro + 2 Starter + 8 Care Plans = $10.5k/month

---

## 🚀 Run-Today Checklist (Get First 2 Sales in 14 Days)

### Week 1: Prospecting Blitz

**Day 1**: Build first lead list (50 businesses)
- Google Maps: "restaurant Montréal"
- Instagram: #mtlrestaurant (500-5k followers)
- Output: `outputs/leads/raw.csv`

**Day 2**: Set up infrastructure
- Professional email: contact@votreagence.com
- Calendly for discovery calls (free tier)
- Write first cold email using template

**Day 3**: Personalize + send 25 emails
- Run `enrich-leads.ts` to get email guesses
- Manually verify 10 emails (Hunter.io free tier)
- Send Email #1

**Day 4**: LinkedIn + Instagram DMs (15 messages)
- Comment on 2 posts first (warm intro)
- Send DM using template

**Day 5**: Follow up + refine
- Send Email #2 to non-responders
- Book 2 discovery calls

### Week 2: Close + Build

**Day 8**: Run 2 discovery calls
- Use sales call script
- Send proposals same day

**Day 9**: Close first client + collect deposit
- Follow up on proposals (call if no reply)
- Collect 50% deposit ($1,250 for Starter)

**Day 10**: Brief intake + design mockup
- Send brief questionnaire
- Create wireframe in Figma

**Day 11-13**: Build the site
- Run `scaffold-wp-site.sh` or `scaffold-nextjs-site.ts`
- Add client content
- Test on mobile

**Day 14**: Launch + request testimonial
- Deploy to hosting (Hostinger $3/mo or Netlify free)
- Send client training video (Loom, 5 min)
- Request Google review

**Result**: 1 site launched, $1,250 in bank, 3-5 warm leads for next month

---

## 🛠️ Tools & Integrations

### Essential (Free Tiers Available)
- **Google Maps**: Lead scraping
- **Hunter.io**: Email verification (50 free/month)
- **Calendly**: Discovery call scheduling
- **Google Sheets / Airtable**: CRM alternative

### Optional (Paid, Higher ROI)
- **Outscraper** ($20/mo): Automate Google Maps scraping
- **Lemlist / Instantly** ($50/mo): Email automation + warm-up
- **LinkedIn Sales Navigator** ($80/mo): Better lead targeting
- **Snov.io** ($39/mo): Email finder + verifier

### Website Tools
- **WordPress Hosting**: Hostinger ($3/mo), O2Switch ($7/mo), SiteGround ($15/mo)
- **Next.js Hosting**: Vercel (free), Netlify (free)
- **Plugins**: Contact Form 7, Yoast SEO, WP Rocket, UpdraftPlus

---

## 📊 Metrics to Track

### Lead Gen (Weekly)
- New leads added: 50/week
- Outreach sent: 25/week
- Reply rate: 5-10% (email), 20-30% (DM)
- Discovery calls booked: 2+/week

### Sales (Monthly)
- Discovery calls held: 8-10/month
- Proposals sent: 5-6/month
- Conversion rate: 50% (proposals → contracts)
- Signed contracts: 3-4/month

### Delivery (Per Project)
- On-time delivery: >90%
- Client satisfaction: 4.5+ stars
- Revision rounds used: <2 (average)
- Upsells (Care Plan): 30% conversion

### Revenue (Monthly)
- MRR (Monthly Recurring Revenue from Care Plans): $1,600+ (8 clients)
- Project revenue: $8,000-$12,000 (3-4 sites)
- **Total**: $10k-$14k/month

---

## 🎓 Learning Resources

### Recommended Reading
- **"$100M Offers"** by Alex Hormozi (pricing strategy)
- **"The Mom Test"** by Rob Fitzpatrick (customer discovery)
- **"Traction"** by Gabriel Weinberg (lead gen channels)

### Technical Skills
- **WordPress**: [WordPress.org Learn](https://learn.wordpress.org/)
- **Next.js**: [Next.js Tutorial](https://nextjs.org/learn)
- **Tailwind CSS**: [Tailwind Docs](https://tailwindcss.com/docs)
- **SEO**: [Moz Beginner's Guide](https://moz.com/beginners-guide-to-seo)

### Business Skills
- **Cold Email**: [Lemlist Academy](https://academy.lemlist.com/)
- **Discovery Calls**: [Close.com Sales University](https://close.com/resources/)
- **Productized Services**: [Productize Yourself](https://productizeyourself.com/)

---

## 🤝 Support & Community

### Issues & Bugs
- Open an issue in this repo (if using GitHub)
- Email: support@votreagence.com

### Contributions
- Fork this repo
- Submit pull requests with improvements
- Share your success stories!

### Stay Updated
- Follow on Twitter: [@votreagence](https://twitter.com)
- Join Discord: [link]
- Newsletter: [sign up link]

---

## 📄 License

MIT License — You're free to use, modify, and commercialize this system.

---

## ✅ Next Steps

1. **Set up environment**: `npm install` + configure `.env`
2. **Build first lead list**: 50 businesses (Google Maps + Instagram)
3. **Send first outreach batch**: 25 personalized emails
4. **Book 2 discovery calls**: Use sales call script
5. **Close first client**: Collect deposit + start build
6. **Launch first site**: 7-10 days, request testimonial
7. **Scale**: Repeat weekly, track metrics, refine process

**Goal**: $10k/month in 90 days (2-3 days/week effort)

---

**Built with ❤️ for ambitious agency owners in Québec.**

**Let's build something great together! 🚀**