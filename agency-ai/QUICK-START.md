# Quick Start Guide — Agency AI

Get your first 2 clients and launch your first site in **14 days**.

---

## Day 1: Setup (30 minutes)

```bash
# 1. Install dependencies
cd agency-ai
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env: Add your name, email, phone, Calendly link

# 3. Test scripts
npm run personalize -- google.com "Google"
```

✅ You're ready to find leads!

---

## Day 2-5: Find First 50 Leads (2 hours/day)

### Method 1: Google Maps (Manual)
1. Search: **"restaurant Montréal"** on Google Maps
2. Copy 20 businesses to `outputs/leads/raw.csv`:
   ```csv
   business_name,website,city,industry
   Café Bloom,cafebloom.ca,Montréal,Restaurant
   ```
3. Repeat for: plumbers, clinics, salons

### Method 2: Instagram (Manual)
1. Search hashtags: **#mtlrestaurant #cafemontreal**
2. Filter: 500-5k followers, French captions
3. Note: Name, handle, website (from bio)

### Method 3: LinkedIn Sales Navigator (Paid, Optional)
1. Search: `Propriétaire`, `Greater Montreal`, `Restaurants`
2. Export 10-20 leads

---

## Day 3: Enrich Leads (30 minutes)

```bash
# Add domain, email guesses, tech stack
npm run enrich -- outputs/leads/raw.csv outputs/leads/enriched.csv
```

**Output**: Email guesses + tech stack (WordPress, Wix, No site)

---

## Day 4-5: Send Outreach (2 hours)

### Personalize First 10 Emails
```bash
# For each lead, generate personalization
npm run personalize -- cafebloom.ca "Café Bloom" "Sophie" "Montréal"
```

Copy output into email template from `prompts/outreach-templates-fr.md`

### Send via Gmail
- Use professional email (contact@votreagence.com)
- Subject: `Question rapide sur Café Bloom`
- Personalize first line
- BCC yourself

### Goal
- 25 emails sent by end of Day 5
- Track in CRM:
  ```bash
  npm run crm-update -- outputs/leads/crm.csv info@cafebloom.ca contacted "Sent email #1"
  ```

---

## Day 6-7: Follow-Up (1 hour)

### Check for Replies
- Reply to interested leads immediately
- Book discovery calls (Calendly link)

### Send Follow-Up #1 (Day +3)
- To non-responders
- Template: Email #2 from `prompts/outreach-templates-fr.md`
- Offer portfolio examples

### Goal
- 2 discovery calls booked by end of Week 1

---

## Day 8: Discovery Calls (1 hour)

### Prepare
- Review: `workflows/sales-call-script.md`
- Check their website/Instagram beforehand
- Have Calendly + portfolio links ready

### Run Call (15 min each)
1. **Opener** (2 min): Compliment + confirm pain point
2. **Qualify** (5 min): Budget ($2k-$4k?), timeline, decision-maker
3. **Pitch** (5 min): Starter ($2.5k) or Pro ($4k), show portfolio
4. **Next steps** (3 min): Send proposal today

### Post-Call (Within 4 hours)
- Send proposal: `workflows/proposal-template.md`
- Customize with their info
- Follow up in 48 hrs if no reply

---

## Day 9: Close First Client (1 hour)

### Follow-Up on Proposals
- Call or email: "Did you get a chance to review?"
- Answer objections (see sales script)
- Offer to adjust package if needed

### Collect Deposit
- 50% upfront ($1,250 for Starter, $2,000 for Pro)
- Methods: Interac, Stripe, PayPal
- Send invoice + contract (PandaDoc or PDF)

### Goal
- **1 signed contract** + **deposit in bank**

---

## Day 10: Brief Intake (30 minutes)

### Send Client
1. Brief questionnaire: `prompts/brief-questionnaire.md`
2. Request: logo, brand colors, content, photos
3. Schedule kickoff call (30 min)

### Create Project File
```json
{
  "client": "Café Bloom",
  "package": "Starter",
  "pages": ["Accueil", "Menu", "À propos", "Contact"],
  "deadline": "2025-11-27"
}
```

Save as: `outputs/sites/cafe-bloom/brief.json`

---

## Day 11: Generate Sitemap (30 minutes)

```bash
npm run generate-sitemap -- outputs/sites/cafe-bloom/brief.json outputs/sites/cafe-bloom/sitemap.md
```

**Output**: Sitemap with page structure + component checklist

### Get Client Approval
- Share sitemap via Google Doc or PDF
- Wait for approval before coding (avoid rework)

---

## Day 12-13: Build Site (4-6 hours)

### Option A: WordPress
```bash
bash scripts/scaffold-wp-site.sh cafe-bloom
```

1. Copy theme to WordPress installation
2. Activate theme
3. Install plugins: Contact Form 7, Yoast SEO
4. Create pages from sitemap
5. Add client content

### Option B: Next.js
```bash
npm run scaffold-nextjs -- outputs/sites/cafe-bloom/brief.json
cd outputs/sites/cafe-bloom
npm install
npm run dev
```

1. Customize homepage (hero, services, CTA)
2. Add client content to all pages
3. Configure contact form (API route or Formspree)
4. Test on mobile (Chrome DevTools)

---

## Day 14: QA + Launch (2-3 hours)

### QA Checklist
- [ ] All pages load correctly
- [ ] Mobile responsive (375px, 768px, 1440px)
- [ ] Forms submit (test contact form)
- [ ] Links work (internal + external)
- [ ] Images optimized (WebP, alt text)
- [ ] SEO: title tags, meta descriptions, sitemap.xml

### Deploy
**WordPress**:
- Upload to hosting (Hostinger, SiteGround, O2Switch)
- Configure domain DNS (A record)
- Enable SSL (HTTPS)

**Next.js**:
```bash
git push origin main
vercel --prod
# Or deploy to Netlify via GitHub
```

### Client Handoff
1. **Training video** (Loom, 5-10 min): How to edit site
2. **Credentials**: WordPress login, hosting, Google Analytics
3. **Request testimonial**: Google review + written testimonial
4. **Collect final 50%**: Invoice for balance

---

## Day 14 Results ✅

- **1 site launched** (live, HTTPS, mobile-responsive)
- **$1,250-$2,000 in bank** (from deposit)
- **$1,250-$2,000 balance due** (after launch)
- **3-5 warm leads** in pipeline (from outreach)
- **1 testimonial** (for future proposals)

---

## Week 3-4: Scale (Repeat)

### Prospecting (Monday, 2 hrs)
- Add 50 new leads
- Enrich with `enrich-leads.ts`

### Outreach (Wednesday, 2 hrs)
- Send 25 emails/DMs
- Follow up on Week 2 non-responders

### Calls & Close (Friday, 2 hrs)
- Run 2 discovery calls
- Send proposals
- Close 1-2 more clients

### Build & Launch (Ongoing)
- Build 2nd and 3rd sites (overlap projects)
- Deliver within 7-10 days each

---

## 30-Day Goal: $10k/month

### Revenue Breakdown
- **Week 1**: 1 client ($2.5k Starter)
- **Week 2**: 1 client ($4k Pro)
- **Week 3**: 2 clients (1 Starter + 1 Pro = $6.5k)
- **Week 4**: 1 client + 5 Care Plans ($2.5k + $1k = $3.5k)

**Total**: $16.5k in first month (mix of project + recurring revenue)

### Time Investment
- **Prospecting**: 6 hrs/week
- **Sales calls**: 2 hrs/week
- **Building sites**: 12 hrs/week (overlapping 2-3 projects)
- **Total**: 20 hrs/week (2.5 days/week)

---

## Common Issues & Solutions

### "No one is replying to my emails"
- **Check**: Is first line personalized? (not generic)
- **Check**: Subject line not spammy?
- **Try**: LinkedIn/Instagram DMs (higher reply rate)
- **Test**: A/B test subject lines (2 variants, track open rate)

### "Leads say it's too expensive"
- **Qualify better**: Ask budget upfront in discovery call
- **Show ROI**: "5 new clients from Google = $5k value, site pays for itself"
- **Offer payment plan**: 3 payments of $850 (add 10% fee)

### "I'm stuck on the build"
- **Use templates**: WordPress Elementor templates, Next.js starters
- **Ask Claude Code**: "Generate contact form component for Next.js"
- **Hire freelancer**: Fiverr/Upwork for $100-200 to unblock

### "Client delays content (photos, text)"
- **Set deadline**: "I need content by Friday or launch delays 1 week"
- **Use placeholders**: Lorem ipsum + Unsplash photos, launch anyway
- **Charge rush fee**: $200 if they want changes after placeholder launch

---

## Next Steps

1. **Complete Day 1 setup** (30 min)
2. **Build first 50-lead list** (2 hrs)
3. **Send first 25 emails** (2 hrs)
4. **Book 2 discovery calls** (within 7 days)
5. **Close first client** (within 14 days)
6. **Launch first site** (within 21 days)

**You've got this! 🚀**

---

## Resources

- **Full documentation**: `README.md`
- **Agent prompts**: `agents/` folder
- **Workflows**: `workflows/` folder
- **Outreach templates**: `prompts/outreach-templates-fr.md`
- **Scripts**: `scripts/` folder

**Questions?** Re-read `workflows/sales-call-script.md` and `workflows/build-runbook.md`.

**Stuck?** Ask Claude Code: "Help me with [specific issue]"

---

**Let's go! 💪**