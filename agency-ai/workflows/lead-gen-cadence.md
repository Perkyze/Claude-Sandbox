# Weekly Prospecting Cadence (6 hrs/week)

## Monday (2 hrs)

### 1. Build Lead List (50 new businesses)

**Target Sources**:
- **Google Maps** (20 businesses):
  - Query: `restaurant Montréal` OR `plombier Laval` OR `clinique Québec`
  - Filter: 3+ years, <10 employees, active reviews
  - Export manually or use [Outscraper](https://outscraper.com/)

- **Instagram** (20 local services):
  - Hashtags: `#mtlbusiness #cafemontreal #plombiermtl #cliniquemtl`
  - Filters: 500-5k followers, French captions, active last 30 days
  - Note: Handle, website link in bio, location tag

- **LinkedIn Sales Navigator** (10 owners):
  - Title: `Propriétaire OR Gérant OR Founder`
  - Location: `Greater Montreal Metropolitan Area`
  - Industry: `Restaurants, Home Services, Health & Wellness`
  - Company Size: `1-10 employees`

**Output**: Add to `outputs/leads/leads.csv`

### 2. Enrich Leads

Run enrichment script:
```bash
npm run enrich -- outputs/leads/raw.csv outputs/leads/enriched.csv
```

This adds:
- Email guesses (info@, contact@, bonjour@)
- Tech stack detection (WordPress, Wix, No site)
- Social media presence

### 3. Segment & Prioritize

Flag **high-priority leads**:
- Instagram active (posted within 7 days)
- No website OR outdated site (not mobile-friendly)
- 500+ Instagram followers (shows marketing effort)
- Service-based (easier to show ROI)

---

## Wednesday (2 hrs)

### 1. Personalize Outreach (Batch of 25)

**For each lead**:
1. Visit homepage or Instagram profile
2. Run personalization script:
   ```bash
   npm run personalize -- https://cafebloom.ca "Café Bloom"
   ```
3. Copy output compliment into email template

**Manual personalization checklist**:
- [ ] First line mentions specific detail (menu item, service, Instagram post)
- [ ] Pain point matches their current situation
- [ ] CTA is low-pressure (15 min call, portfolio examples)

### 2. Send Cold Emails (15 emails)

**Using Gmail** (manual send for better deliverability):
- Send from professional email (contact@votredomaine.com)
- Personalize subject line: `Question rapide sur [Business Name]`
- BCC yourself to track
- Add to "Contacted" folder

**OR using Lemlist/Instantly** (semi-automated):
- Upload CSV with personalization fields
- Set daily send limit (10-15/day to avoid spam filters)
- Enable auto follow-up sequence

### 3. LinkedIn/Instagram DMs (10 messages)

**Warm-up strategy**:
1. Comment on 2 recent posts (genuine compliment, not salesy)
2. Wait 24 hours
3. Send DM using template from `prompts/outreach-templates-fr.md`

**Track in CRM**:
```bash
npm run crm-update -- outputs/leads/crm.csv info@cafebloom.ca contacted "Sent email #1"
```

---

## Friday (2 hrs)

### 1. Follow-Ups (25 emails)

**Query CRM for non-responders**:
- Status = "contacted"
- last_contact = 3-5 days ago

**Send Email #2**:
- Subject: `Re: Question rapide sur [Business Name]`
- Template: Follow-up #1 from `prompts/outreach-templates-fr.md`
- Offer portfolio examples

### 2. CRM Hygiene

**Update statuses**:
- Mark replies → "qualified"
- Book discovery calls → "discovery_scheduled"
- No reply after 3 touches → "not_interested"

**Script**:
```bash
npm run crm-update -- outputs/leads/crm.csv lead@example.com qualified "Replied, interested in $2500 package"
```

### 3. Pipeline Review

**Metrics to track**:
| Metric | Target | Actual |
|--------|--------|--------|
| New leads added | 50 | ___ |
| Outreach sent | 25 | ___ |
| Reply rate (email) | 5-10% | ___% |
| Reply rate (DM) | 20-30% | ___% |
| Discovery calls booked | 2+ | ___ |

**Optimization**:
- If reply rate < 5%: Improve personalization or test new subject lines
- If DM rate low: Engage more with posts before sending DM
- If calls not converting: Review discovery call script

---

## Weekly Goal Summary

**Input**: 6 hours of focused prospecting work

**Output**:
- 50 new leads in CRM
- 25 personalized outreach messages sent
- 2+ discovery calls booked
- 5-10 qualified leads in pipeline

**Monthly Projection** (4 weeks):
- 200 leads in CRM
- 100 outreach messages
- 8-10 discovery calls
- **4-5 signed contracts** ($10k-$15k revenue)

---

## Monthly A/B Testing

### Test #1: Subject Lines (Email)
- **A**: `Question rapide sur [Business Name]`
- **B**: `[Business Name] — Site web moderne en 10 jours`
- Track open rates, reply rates

### Test #2: DM Approach (Instagram)
- **A**: Start with compliment on recent post
- **B**: Start with pain point observation
- Track reply rate, tone of replies

### Test #3: Industries
- **A**: Restaurants (competitive, price-sensitive)
- **B**: Health/wellness (higher budgets, less competition)
- Track conversion rate, avg deal size

---

## Red Flags to Stop Pursuing

- No reply after 3 touches (email + 2 follow-ups)
- Out-of-office reply with no return date
- Reply: "Send me your pricing" without discovery call
- Company has in-house dev team (check LinkedIn)

**Action**: Mark as "not_interested" and revisit in 6 months with different angle.

---

## Tools Checklist

**Essential** (free tiers available):
- [ ] Google Maps (lead scraping)
- [ ] Hunter.io (email verification, 50 free/month)
- [ ] Calendly (discovery call scheduling)
- [ ] Google Sheets or Airtable (CRM alternative)

**Optional** (paid, but higher ROI):
- [ ] Outscraper ($20/month, automate Google Maps scraping)
- [ ] Lemlist or Instantly ($50/month, email automation + warm-up)
- [ ] LinkedIn Sales Navigator ($80/month, better lead targeting)
- [ ] Snov.io ($39/month, email finder + verifier)

---

## Weekly Reflection Questions

1. Which channel (email vs. LinkedIn vs. Instagram) got the best replies this week?
2. Which industry/vertical responded fastest?
3. What personalization detail got the most engagement?
4. Any objections that came up repeatedly? (How to address in future outreach?)
5. Are you on track for 2 discovery calls/week? If not, what to adjust?