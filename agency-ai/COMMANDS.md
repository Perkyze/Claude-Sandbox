# Claude Code Slash Commands Reference

All commands are available in Claude Code via the `/` prefix.

---

## Available Commands

### `/orchestrator`
**Coordinate all agency workflows and route tasks**

Use when:
- You need a high-level pipeline overview
- You're not sure which agent to use
- You want a daily standup summary
- You need to coordinate multiple workflows

**Example**:
```
/orchestrator
What's my pipeline status this week?
```

---

### `/prospect`
**Find leads, generate outreach, and manage CRM**

Use when:
- Building lead lists (search queries for Google Maps, Instagram, LinkedIn)
- Enriching leads (domain → email + tech stack)
- Personalizing outreach (homepage → custom email/DM)
- Updating CRM statuses
- Querying follow-ups

**Examples**:
```
/prospect
Find me 50 restaurant leads in Montreal

/prospect
Generate personalized email for Café Bloom (cafebloom.ca)

/prospect
Who needs follow-up from my CRM?
```

---

### `/build`
**Scaffold sites, generate sitemaps, and manage website builds**

Use when:
- Generating sitemap from client brief
- Scaffolding WordPress theme
- Scaffolding Next.js project
- Following 7-10 day build workflow
- Need QA checklist before launch

**Examples**:
```
/build
Create sitemap for Café Bloom brief

/build
Scaffold WordPress site for cafe-bloom

/build
What's the build process for a Pro package?
```

---

### `/crm`
**Manage CRM, query pipeline, track leads through sales funnel**

Use when:
- Adding/updating leads in CRM
- Checking pipeline status
- Finding leads needing follow-up
- Generating pipeline reports
- Tracking conversion metrics

**Examples**:
```
/crm
Add new lead: info@cafebloom.ca, Café Bloom, Sophie

/crm
Show me pipeline summary

/crm
Who needs follow-up (contacted 3+ days ago)?
```

---

### `/sales-call`
**Prepare for and run discovery calls**

Use when:
- Preparing for upcoming discovery call
- Need call script reminders
- Handling objections (price, timeline, DIY)
- Writing post-call proposal
- Updating lead status after call

**Examples**:
```
/sales-call
Prepare me for call with Café Bloom tomorrow

/sales-call
How do I handle "it's too expensive" objection?

/sales-call
What questions should I ask on discovery call?
```

---

### `/qa-launch`
**Run QA checks and launch websites**

Use when:
- Running pre-launch QA checklist
- Testing mobile responsiveness
- Checking SEO (titles, meta, schema)
- Verifying performance (Lighthouse)
- Deploying to production
- Creating client handoff materials

**Examples**:
```
/qa-launch
Run full QA checklist for cafe-bloom staging site

/qa-launch
Launch cafe-bloom to production

/qa-launch
Generate client training video outline
```

---

## Command Workflow (Typical Journey)

### Week 1: Prospecting
```
/prospect
Find 50 restaurant leads in Montreal
→ Build list, enrich, send 25 emails

/crm
Show pipeline status
→ Track replies, book calls
```

### Week 2: Sales
```
/sales-call
Prepare for call with Café Bloom
→ Run call, send proposal

/crm
Update Café Bloom to "won"
→ Collect deposit
```

### Week 3-4: Build & Launch
```
/build
Create sitemap for Café Bloom
→ Get client approval

/build
Scaffold WordPress site for cafe-bloom
→ Build in 7-10 days

/qa-launch
Run QA checklist for cafe-bloom
→ Test, fix issues

/qa-launch
Launch cafe-bloom to production
→ Handoff, request testimonial
```

### Ongoing: Orchestration
```
/orchestrator
Weekly pipeline review
→ Metrics, next steps, blockers

/crm
Query follow-ups
→ Send Email #2, #3
```

---

## Quick Reference by Task

| Task | Command | Example |
|------|---------|---------|
| Find leads | `/prospect` | "Find 50 plumbers in Laval" |
| Personalize email | `/prospect` | "Generate email for [URL]" |
| Update CRM | `/crm` | "Mark lead as contacted" |
| Pipeline status | `/crm` or `/orchestrator` | "Show pipeline summary" |
| Prep for call | `/sales-call` | "Prepare for call with X" |
| Handle objection | `/sales-call` | "How to respond to 'too expensive'?" |
| Generate sitemap | `/build` | "Create sitemap from brief" |
| Scaffold site | `/build` | "Create WordPress site for X" |
| Run QA | `/qa-launch` | "Test site before launch" |
| Launch site | `/qa-launch` | "Deploy to production" |
| Daily standup | `/orchestrator` | "What's the status today?" |

---

## Tips for Best Results

1. **Be specific**: Instead of "help me with leads", say "Find 50 restaurant leads in Montreal"
2. **Provide context**: Mention client name, URL, or brief details when relevant
3. **Use natural language**: Commands understand conversational requests
4. **Chain tasks**: You can use multiple commands in sequence for complex workflows
5. **Check orchestrator first**: If unsure which command to use, start with `/orchestrator`

---

## Commands Location

All command files are stored in:
```
d:/website/Claude-Sandbox/.claude/commands/
```

You can edit these files to customize agent behavior.

---

## Next Steps

1. **Try a command**: Type `/prospect` in Claude Code
2. **Follow a workflow**: Use Quick Start guide for 14-day plan
3. **Customize**: Edit command files to match your style
4. **Scale**: Use orchestrator to coordinate multiple projects

**Ready to go! Start with `/orchestrator` to get your pipeline overview.** 🚀