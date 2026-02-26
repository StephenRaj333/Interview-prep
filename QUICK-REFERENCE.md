# Next.js Rendering - Quick Reference Card

## One-Liner Definitions
- **SSR**: Render on every request → Always fresh, slower
- **SSG**: Render once at build → Super fast, stale data
- **ISR**: Render at build, refresh periodically → Fast & fresh

---

## Quick Lookup Table

```
FEATURE              SSR              SSG              ISR
Render When          Every request    Build time       Build + periodic
Data Freshness       Always fresh     Stale            Eventually fresh
Speed                Slow (500ms+)    Fast (10ms+)     Fast (10ms+)
CDN Cacheable        No               Yes              Yes
Build Time           N/A              Slow             Medium
Revalidate           false            false            60 (example)
Best For             Real-time        Static           Hybrid
```

---

## Code Patterns

### SSR Pattern
```tsx
export async function getServerSideProps() {
    const data = await fetch('...');
    return { props: { data }, revalidate: false };
}
```

### SSG Pattern
```tsx
export async function getStaticProps() {
    const data = await fetch('...');
    return { props: { data } };
    // or
    return { props: { data }, revalidate: false };
}

export async function getStaticPaths() {
    return { paths: [...], fallback: 'blocking' };
}
```

### ISR Pattern
```tsx
export async function getStaticProps() {
    const data = await fetch('...');
    return { props: { data }, revalidate: 60 };
}
```

---

## Revalidate Values

| Value | Behavior | Strategy |
|-------|----------|----------|
| `false` | Never revalidate | SSR if in getServerSideProps, SSG if in getStaticProps |
| `0` | Revalidate on every request | SSR |
| `60` | Revalidate every 60 seconds | ISR |
| `3600` | Revalidate every hour | ISR |

---

## Fallback Modes

```
fallback: false       → Strict: Only pre-rendered paths work
fallback: true        → Partial: Generate others in background  
fallback: 'blocking'  → On-demand: Generate on first request
```

---

## App Router vs Pages Router

### Pages Router (Older)
```tsx
export async function getServerSideProps() { ... }
export async function getStaticProps() { ... }
export async function getStaticPaths() { ... }
```

### App Router (New)
```tsx
// Server Component by default (SSR)
export default async function Page() {
    const data = await fetch('...', { cache: 'no-store' });
    return <div>{data}</div>;
}

// Add cache options
export const revalidate = 60; // ISR
export const revalidate = 0;  // SSR (every request)
```

---

## Common Scenarios → Best Strategy

| Scenario | Strategy | Reason |
|----------|----------|--------|
| Blog post | SSG | Content rarely changes |
| E-commerce product | ISR | Price/stock updates daily |
| User dashboard | SSR | User-specific data |
| Marketing homepage | SSG | Static content |
| News article | ISR | Updates every few hours |
| Live stock prices | SSR + WebSocket | Real-time data |
| API documentation | SSG | Static reference |
| Admin panel | SSR | Authenticated only |

---

## Decision Tree (Print This!)

```
START: What rendering strategy for this page?

└─ Does user get DIFFERENT data than others?
   ├─ YES → SSR (getServerSideProps)
   └─ NO → Does data change?
      ├─ EVERY REQUEST → SSR
      ├─ DAILY/WEEKLY → ISR (set revalidate)
      └─ NEVER → SSG (no revalidate)
```

---

## Gotchas to Avoid

❌ **Don't** use SSG for user-specific data (exposes other users' data)  
❌ **Don't** use SSG with `fallback: true` for large datasets (tons of builds)  
❌ **Don't** forget `getStaticPaths` with dynamic routes  
❌ **Don't** ignore build time impacts of SSG with thousands of pages  
❌ **Don't** mix client-side fetching with SSR (fetch twice)  
✅ **Do** use ISR with `fallback: 'blocking'` for e-commerce (pre-render top items)  
✅ **Do** combine ISR pages with client-side updates (best UX)  
✅ **Do** use On-Demand Revalidation for CMS content updates  

---

## Interview Answers (30 seconds each)

**Q: Why would you use ISR?**
A: "It's the best of both worlds - pages are built at deploy time for speed, then I can update them automatically every N seconds without rebuilds. Perfect for products with occasional inventory changes."

**Q: Difference between SSR and ISR?**
A: "SSR fetches fresh data on every request - it's slow but always current. ISR builds once, then revalidates periodically - it's fast but slightly stale. Choose ISR when you don't need real-time."

**Q: Can you use SSG for 10,000 products?**
A: "Not directly - it would take forever at build time. Instead, I'd pre-render the top 100, then use fallback: 'blocking' for the rest. That way popular products are instant, others generate on first request."

**Q: How do you update ISR without rebuild?**
A: "Use On-Demand Revalidation - an API endpoint that calls revalidatePath() when the CMS sends a webhook. That way, when content updates, I instantly regenerate without rebuilds."

**Q: SSR vs Client-Side Fetch?**
A: "SSR renders on the server, so the user sees content immediately - better SEO and faster First Contentful Paint. Client-side fetch makes user wait for JavaScript to load first - slower but better for interactivity."

---

## Pro Tips

💡 **Use ISR + Client Components for best UX**
- ISR for static parts (fast page load)
- Client component for dynamic parts (fresh updates)

💡 **Hybrid approach wins**
- SSG for landing pages
- ISR for product listings
- SSR for dashboards
- CSR for interactive features

💡 **Monitor build times**
- 10,000 SSG pages = several minutes to build
- Use ISR with fallback for large scale

💡 **Cache Headers Matter**
- ISR respects your Cache-Control headers
- CDN respects revalidate timing

---

## Your Cheat Sheet
Memorize this before the interview:

```
SSR = Every request (slow, fresh)
SSG = Once at build (fast, stale)  
ISR = Periodic refresh (fast, fresh enough)

Real-time? → SSR
Static? → SSG
Mostly static? → ISR
```

**NEXT STEP:** Go look at the example files you created:
- `/ssr/page.tsx` - See SSR implementation
- `/app/ssg/page.tsx` - See SSG implementation  
- `/app/isr/page.tsx` - See ISR implementation
- `RENDERING-GUIDE.md` - Full explanations
- `INTERVIEW-QUESTIONS.md` - Real scenarios

Good luck! 🚀
