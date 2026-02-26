# Next.js Interview Questions - SSR, SSG, ISR

## Real-World Scenario Questions

### Scenario 1: E-commerce Product Catalog
**Question:** You have an e-commerce site with 10,000 products. Which rendering strategy would you use and why?

**Answer:**
- **ISR** is best here
- Pre-generate top 100 products at build time (best sellers, latest)
- Use `fallback: 'blocking'` for remaining 9,900 products
- Set `revalidate: 3600` (1 hour) for price/stock updates
- When inventory updates, use on-demand revalidation API

```tsx
export async function getStaticPaths() {
    const topProducts = await fetch(...).then(r => r.json());
    
    return {
        paths: topProducts.map(p => ({ params: { id: p.id.toString() } })),
        fallback: 'blocking' // Generate other products on first request
    };
}

export async function getStaticProps({ params }) {
    const product = await fetch(`/api/products/${params.id}`);
    
    return {
        props: { product },
        revalidate: 3600 // Refresh hourly
    };
}
```

---

### Scenario 2: Real-Time Stock Trading Dashboard
**Question:** You're building a trading dashboard showing live stock prices that update every second. What's your approach?

**Answer:**
- **SSR for the initial page load** to show user's data
- **Client-side updates** with WebSocket or polling for real-time prices
- Never use SSG or ISR (data must be fresh every second)

```tsx
export async function getServerSideProps(context) {
    const userId = context.req.userId;
    const userPortfolio = await db.getUserPortfolio(userId);
    
    return {
        props: { userPortfolio },
        revalidate: false // Fresh every time
    };
}

export default function Dashboard({ userPortfolio }) {
    const [prices, setPrices] = useState({});
    
    useEffect(() => {
        // Real-time updates via WebSocket
        const ws = new WebSocket('wss://api.stocks.com/live');
        ws.onmessage = (e) => {
            setPrices(JSON.parse(e.data));
        };
        return () => ws.close();
    }, []);
    
    return <div>Live prices: {JSON.stringify(prices)}</div>;
}
```

---

### Scenario 3: Marketing Website for SaaS
**Question:** You have a marketing site with 50 pages (pricing, features, blog, etc.) that rarely change. What approach?

**Answer:**
- **SSG** for all pages
- Pages built once at deploy, served from CDN globally
- Rebuild only when content updates

```tsx
// No revalidate needed - pure static
export async function getStaticProps() {
    const content = await cms.getContent('pricing-page');
    
    return {
        props: { content },
        // revalidate: false (default) - never regenerate
    };
}
```

---

### Scenario 4: Blog with Comments
**Question:** Blog posts are static but comments are added constantly. How do you handle this?

**Answer:**
- **ISR for blog posts** (e.g., revalidate every 5 minutes)
- **SSR or CSR for comments section** (client-side rendering)
- Separate comments to a dynamic component

```tsx
// app/blog/[slug]/page.tsx
export async function getStaticProps({ params }) {
    const post = await db.getBlogPost(params.slug);
    
    return {
        props: { post },
        revalidate: 300 // Refresh every 5 minutes
    };
}

export default function BlogPost({ post }) {
    return (
        <>
            <article>{post.content}</article>
            <CommentsSection slug={post.slug} /> {/* Client component - fetches fresh comments */}
        </>
    );
}

// app/components/CommentsSection.tsx
'use client'; // Client component

export default function CommentsSection({ slug }) {
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        fetch(`/api/comments/${slug}`)
            .then(r => r.json())
            .then(setComments);
    }, [slug]);
    
    return <div>{comments.map(c => <div key={c.id}>{c.text}</div>)}</div>;
}
```

---

### Scenario 5: Multi-Tenant SaaS Dashboard
**Question:** Each tenant has their own dashboard with private data. What strategy?

**Answer:**
- **SSR only** - every user sees different data
- Must check authentication and authorization on server
- Can't pre-generate without exposing data

```tsx
export async function getServerSideProps(context) {
    const { tenantId } = context.query;
    const session = await getSession(context);
    
    // Verify user owns this tenant
    if (session.tenantId !== tenantId) {
        return { notFound: true };
    }
    
    const data = await db.getTenantData(tenantId);
    
    return {
        props: { data },
        revalidate: false
    };
}
```

---

## Common Interview Questions

### Q1: What does revalidate: false mean?
**A:** It means **no caching** - the page is treated as SSR. It regenerates on every request. This is the default behavior when you don't specify a `revalidate` value.

### Q2: What's the difference between revalidate and fallback?
**A:**
- **revalidate**: How often to regenerate a static page (ISR timing)
- **fallback**: What to do when user requests a path not in `getStaticPaths` at build time

### Q3: Can you use getServerSideProps with App Router?
**A:** No. In App Router, pages are Server Components by default. You don't need `getServerSideProps`. Just use `async` server components:

```tsx
// App Router - this IS SSR (fetches on every request)
export default async function Page() {
    const data = await fetch('...', { cache: 'no-store' });
    return <div>{data}</div>;
}
```

### Q4: What's cache: 'no-store' vs cache: 'force-cache'?
**A:** (App Router fetch options)
- `cache: 'no-store'` - SSR, fresh every request
- `cache: 'force-cache'` - SSG, cached forever
- `next: { revalidate: 3600 }` - ISR with 1 hour revalidation

### Q5: How does On-Demand Revalidation work?
**A:** You trigger regeneration through an API:

```tsx
// app/api/revalidate/route.ts
export async function POST(req) {
    const secret = req.nextUrl.searchParams.get('secret');
    if (secret !== process.env.REVALIDATE_SECRET) return new Response('Invalid', { status: 401 });
    
    await revalidatePath('/products/[id]');
    return Response.json({ revalidated: true });
}

// Called from your CMS: /api/revalidate?secret=xxx
```

### Q6: What happens when revalidate time expires?
**A:**
1. Page marked as "stale"
2. Next user request triggers regeneration **in the background**
3. Old version served to user (no loading state)
4. When regeneration completes, new version cached
5. Future requests get new content

### Q7: What's better for SEO - SSG or SSR?
**A:** **Both are equally good for SEO**. Both render HTML on the server. However, **SSG is better for Core Web Vitals** because it's much faster to serve.

### Q8: Can you mix SSR, SSG, and ISR in one app?
**A:** Yes! Different pages can use different strategies:
```tsx
// app/marketing/page.tsx
export const revalidate = false; // SSG

// app/products/[id]/page.tsx
export const revalidate = 60; // ISR

// app/dashboard/page.tsx
export const revalidate = 0; // SSR (every request)
```

### Q9: What's `fallback: true` vs `fallback: 'blocking'`?
**A:**
- `fallback: true` → Returns 404 immediately, generates in background
- `fallback: 'blocking'` → Generates on first request (slower first load, but accurate)
- `fallback: false` → Always 404 for missing paths

### Q10: How do you handle 404s in ISR?
**A:**
```tsx
export async function getStaticProps({ params }) {
    const product = await db.getProduct(params.id);
    
    if (!product) {
        return {
            notFound: true, // Returns 404
            revalidate: 60
        };
    }
    
    return {
        props: { product },
        revalidate: 60
    };
}
```

---

## Performance Comparison Cheat Sheet

### Time to First Byte (TTFB)
- SSG: **~10ms** (CDN cached)
- ISR: **~10ms** (CDN cached, until revalidate)
- SSR: **~500-2000ms** (depends on API)

### Update Frequency
- SSG: Only on rebuild
- ISR: Every N seconds automatically
- SSR: Every request (always fresh)

### Use Case Priority
1. **Can it be static?** → SSG
2. **Does it update occasionally?** → ISR
3. **Does it need real-time?** → SSR

---

## Key Takeaways for Interview

✅ **Understand the tradeoff**: Speed vs Freshness  
✅ **Know revalidate options**: false, 0, 60, 3600  
✅ **Know when to use each**: Have real examples ready  
✅ **Hybrid apps**: Different pages use different strategies  
✅ **App Router differences**: No getServerSideProps, use Server Components  
✅ **Client-side combo**: Can mix SSG + Client updates for best UX  

Good luck! 🚀
