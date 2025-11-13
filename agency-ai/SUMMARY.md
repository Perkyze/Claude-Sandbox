# Agency AI — Complete System Summary

**Status**: ✅ COMPLETE — All files generated and ready to use!

---

## 📦 What You Received

### 1. AI Agent Prompts (3 files)
**Location**: `agents/`

- **orchestrator.md** — Routes tasks, maintains CRM/project state
- **prospecting-agent.md** — Lead gen, outreach, CRM updates
- **builder-agent.md** — Website build workflow (brief → launch)

**Usage**: Use with Claude Code or as system prompts for custom AI workflows

---

### 2. Workflows & SOPs (5 files)
**Location**: `workflows/`

- **lead-gen-cadence.md** — Weekly prospecting schedule (6 hrs/week, 50 leads)
- **sales-call-script.md** — 15-min discovery call template (qualify → pitch → close)
- **proposal-template.md** — Professional proposal with pricing, timeline, deliverables
- **build-runbook.md** — 7-10 day build process (brief → QA → launch)
- **change-request-policy.md** — Scope management (protect margins, avoid scope creep)

**Usage**: Follow step-by-step for each stage of client journey

---

### 3. Prompts & Templates (3 files)
**Location**: `prompts/`

- **icp-quebec.md** — Ideal Customer Profile (industries, budget signals, red flags)
- **outreach-templates-fr.md** — Cold email/DM sequences (French, 3 touches, A/B tests)
- **brief-questionnaire.md** — Client intake form (goals, pages, content, budget)

**Usage**: Copy templates, customize merge fields, send outreach

---

### 4. Automation Scripts (6 files)
**Location**: `scripts/`

| Script | Purpose | Command |
|--------|---------|---------|
| **enrich-leads.ts** | Domain → email guess + tech stack | `npm run enrich -- input.csv output.csv` |
| **personalize-outreach.ts** | Homepage → personalized email/DM | `npm run personalize -- url "Business"` |
| **update-crm.ts** | Add/update leads in CSV CRM | `npm run crm-update -- crm.csv email status` |
| **generate-sitemap.ts** | Brief JSON → sitemap markdown | `npm run generate-sitemap -- brief.json` |
| **scaffold-wp-site.sh** | WordPress theme generator | `bash scaffold-wp-site.sh site-name` |
| **scaffold-nextjs-site.ts** | Next.js project generator | `npm run scaffold-nextjs -- brief.json` |

**Tech Stack**: TypeScript + Node.js (enrich, personalize, CRM, sitemap, Next.js) + Bash (WordPress)

---

### 5. Output Templates (4 files)
**Location**: `outputs/`

- **leads/leads-template.csv** — Lead list schema (name, industry, website, email, tech stack)
- **leads/crm-template.csv** — CRM schema (email, status, last_contact, notes)
- **sites/brief-template.json** — Client brief structure (pages, features, goals, design)
- **sites/project-template.json** — Project tracking (timeline, deliverables, status)

**Usage**: Copy templates, fill with your data

---

### 6. Configuration Files (6 files)
**Location**: Root directory

- **README.md** — Complete documentation (setup, usage, workflows, pricing)
- **QUICK-START.md** — 14-day action plan (Day 1: setup → Day 14: first launch)
- **SUMMARY.md** — This file (inventory + quick reference)
- **package.json** — Node.js dependencies + npm scripts
- **tsconfig.json** — TypeScript configuration
- **.env.example** — Environment variables template (agency info, API keys)
- **.gitignore** — Git ignore rules (node_modules, .env, outputs)

---

## 🎯 System Capabilities

### Prospecting (Step #1)
✅ **ICP definition** (Québec local services: restaurants, plumbers, clinics)
✅ **Lead search queries** (Google Maps, Instagram, LinkedIn)
✅ **Lead enrichment** (domain → email + tech stack detection)
✅ **Personalized outreach** (homepage → compliment + pain point)
✅ **Email/DM sequences** (3 touches, French, A/B tests)
✅ **CRM management** (CSV-based, statuses: prospect → won/lost)
✅ **Follow-up tracking** (query leads contacted 3+ days ago)

**Goal**: 50 leads/week → 25 outreach/week → 2 discovery calls/week

---

### Website Building (Step #2)
✅ **Client brief intake** (questionnaire with 10 sections)
✅ **Sitemap generation** (brief → page structure + component checklist)
✅ **WordPress scaffolding** (theme with Tailwind, mobile nav, SEO)
✅ **Next.js scaffolding** (App Router, TypeScript, Tailwind, components)
✅ **SEO checklist** (title tags, meta, schema, sitemap.xml)
✅ **QA checklist** (responsive, accessibility, Core Web Vitals)
✅ **Launch checklist** (DNS, SSL, backups, training video)

**Goal**: 7-10 days delivery (Starter), 10-14 days (Pro)

---

### Sales & Operations
✅ **Discovery call script** (qualify → pitch → close in 15 min)
✅ **Proposal template** (pricing, timeline, deliverables, add-ons)
✅ **Change request policy** (scope boundaries, $100/hr for extras)
✅ **3-tier pricing** (Starter $2.5k, Pro $4k, Care Plan $200/mo)
✅ **Revenue projections** ($10k/month with 2-3 sites + 8 Care Plans)
✅ **Weekly cadence** (prospecting, outreach, calls, build, launch)

**Goal**: 3-4 signed contracts/month, 50% proposal → close rate

---

## 💰 Pricing & Packages (Ready to Use)

### Starter Package — $2,500 CAD
- 4 pages (Accueil, Services, À propos, Contact)
- Mobile-responsive, contact form, Google Maps
- WordPress (client can self-edit)
- Basic SEO, 30 days support
- **Timeline**: 7-10 days

### Pro Package — $4,000 CAD
- Everything in Starter + 6 pages
- Online booking (Amelia/Calendly)
- Blog setup, advanced SEO (Schema.org)
- 1-hour training video
- **Timeline**: 10-14 days

### Care Plan — $200/month
- Monthly updates, daily backups
- 1 hour edits/month, uptime monitoring
- Priority support (<12 hrs)
- **Margin**: 90% (mostly passive income)

---

## 🚀 Getting Started (3 Steps)

### Step 1: Setup (30 minutes)
```bash
cd agency-ai
npm install
cp .env.example .env
# Edit .env with your info
npm run personalize -- google.com "Google"  # Test
```

### Step 2: First Outreach Batch (2 hours)
1. Build 50-lead list (Google Maps: "restaurant Montréal")
2. Enrich: `npm run enrich -- raw.csv enriched.csv`
3. Personalize 25 emails: `npm run personalize -- url "Business"`
4. Send outreach (Gmail or Lemlist)
5. Track: `npm run crm-update -- crm.csv email contacted "Sent #1"`

### Step 3: Close & Build (7 days)
1. Run 2 discovery calls (use `sales-call-script.md`)
2. Send proposals (use `proposal-template.md`)
3. Collect 50% deposit
4. Scaffold site: `bash scaffold-wp-site.sh client-name`
5. Build in 7-10 days (follow `build-runbook.md`)
6. Launch + request testimonial

**Result**: $1,250-$2,000 in bank, 1 site launched, testimonial for next proposal

---

## 📊 Key Metrics to Track

### Weekly (Prospecting)
- Leads added: 50/week
- Outreach sent: 25/week
- Reply rate: 5-10% (email), 20-30% (DM)
- Discovery calls: 2+/week

### Monthly (Sales)
- Calls held: 8-10/month
- Proposals sent: 5-6/month
- Conversion rate: 50%
- Signed contracts: 3-4/month

### Revenue (Monthly Goal: $10k)
- Project revenue: $8k-$12k (3-4 sites)
- MRR (Care Plans): $1.6k-$2k (8-10 clients)
- **Total**: $10k-$14k/month

**Time**: 20 hrs/week (2-3 days/week)

---

## 🛠️ Tech Stack

### Required (Installed via npm)
- **Node.js 18+** — Runtime for scripts
- **TypeScript** — Type-safe JavaScript
- **axios** — HTTP requests (homepage scraping)
- **cheerio** — HTML parsing (personalization)
- **csv-parser** — CSV reading
- **csv-writer** — CSV writing

### Optional (External Tools)
- **Google Maps** — Lead scraping (manual or Outscraper)
- **Hunter.io** — Email verification (50 free/month)
- **Calendly** — Discovery call scheduling (free)
- **Lemlist / Instantly** — Email automation ($50/mo)
- **Vercel / Netlify** — Next.js hosting (free)
- **Hostinger / O2Switch** — WordPress hosting ($3-7/mo)

---

## 📚 Documentation Files

### Must-Read (In Order)
1. **README.md** — Full system overview, setup, usage, examples
2. **QUICK-START.md** — 14-day action plan (setup → first launch)
3. **workflows/lead-gen-cadence.md** — Weekly prospecting schedule
4. **workflows/sales-call-script.md** — Discovery call template
5. **workflows/build-runbook.md** — 7-10 day build process

### Reference (As Needed)
- **prompts/icp-quebec.md** — Target customer definition
- **prompts/outreach-templates-fr.md** — Cold email/DM templates
- **prompts/brief-questionnaire.md** — Client intake form
- **workflows/change-request-policy.md** — Scope management
- **workflows/proposal-template.md** — Proposal structure

---

## ✅ What's NOT Included (Intentionally)

### You Need to Provide
- **Domain name** ($15/year via Namecheap, GoDaddy)
- **Hosting** ($3-15/month via Hostinger, O2Switch, SiteGround)
- **Professional email** ($6/month Google Workspace or free via hosting)
- **Your time** (2-3 days/week for prospecting + building)

### Optional Add-Ons (You Can Buy Later)
- **LinkedIn Sales Navigator** ($80/mo) — Better lead targeting
- **Lemlist / Instantly** ($50/mo) — Email automation + warm-up
- **Outscraper** ($20/mo) — Automated Google Maps scraping
- **Hunter.io Pro** ($49/mo) — Unlimited email verification

### Not Automated (Manual Steps)
- **Lead list building** (Google Maps searches, Instagram browsing)
- **Discovery calls** (15-min video calls with prospects)
- **Client content collection** (photos, text, logo from client)
- **Final QA testing** (manual cross-browser/device testing)

**Why**: These require human judgment, relationship-building, or creative decision-making that AI can't (yet) fully automate.

---

## 🎓 Next Steps

### Immediate (Today)
1. ✅ Run `npm install` in `agency-ai/` folder
2. ✅ Configure `.env` with your agency info
3. ✅ Test scripts: `npm run personalize -- google.com "Google"`
4. ✅ Read `QUICK-START.md` (14-day plan)

### Week 1 (Prospecting)
1. Build 50-lead list (Google Maps + Instagram)
2. Enrich with `enrich-leads.ts`
3. Send 25 personalized emails
4. Book 2 discovery calls

### Week 2 (Close & Build)
1. Run discovery calls (use script)
2. Send proposals
3. Close first client + collect deposit
4. Build first site (7-10 days)

### Month 1 (Scale)
1. Repeat prospecting weekly (50 leads/week)
2. Close 3-4 clients/month
3. Deliver 3-4 sites/month
4. Hit $10k revenue (mix of projects + Care Plans)

---

## 📧 Support

### Questions?
- Re-read relevant workflow file (most questions answered there)
- Check `README.md` for full documentation
- Ask Claude Code: "Help me with [specific issue]"

### Found a Bug?
- Check if you ran `npm install` (dependencies might be missing)
- Verify `.env` is configured correctly
- Try running script with `--help` flag (if available)

### Want to Contribute?
- Fork this repo (if on GitHub)
- Improve scripts, templates, or documentation
- Submit pull request

---

## 🏆 Success Criteria (90 Days)

After 90 days of using this system, you should have:

✅ **Pipeline**: 200+ leads in CRM
✅ **Sales**: 12-15 signed contracts
✅ **Delivery**: 12-15 websites launched
✅ **Revenue**: $10k-$15k/month (consistent)
✅ **MRR**: $1.6k-$2k from Care Plans (8-10 clients)
✅ **Testimonials**: 10+ Google reviews + written testimonials
✅ **Portfolio**: 12-15 live sites to show prospects
✅ **Time**: 20 hrs/week (sustainable, profitable)

**If you're not hitting these numbers**: Re-read the workflows, refine your ICP, improve personalization, or ask for help.

---

## 🎉 Final Notes

You now have a **complete, production-ready system** to run a profitable website-building agency.

**Everything is done**:
- ✅ AI agents (3)
- ✅ Workflows & SOPs (5)
- ✅ Prompts & templates (3)
- ✅ Automation scripts (6)
- ✅ Output templates (4)
- ✅ Documentation (3 guides)

**What you need to do**:
1. Set up (30 min)
2. Find leads (2 hrs/week)
3. Send outreach (2 hrs/week)
4. Run calls + close (2 hrs/week)
5. Build sites (12 hrs/week)

**Goal**: $10k/month in 90 days, 2-3 days/week of work.

**You've got everything you need. Now go build! 🚀**

---

**Built with ❤️ for ambitious agency owners in Québec.**

**Bonne chance! 💪**