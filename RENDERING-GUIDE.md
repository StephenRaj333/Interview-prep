# Next.js Rendering Strategies: SSR, SSG, and ISR

## Quick Comparison Table

| Strategy | When Rendered | Regenerated | Use Case | Speed |
|----------|---------------|-------------|----------|-------|
| **SSR** | Every request | Every time | Dynamic, real-time data | Slower |
| **SSG** | Build time | Only at build | Static content | Fastest |
| **ISR** | Build + On-demand | Every N seconds | Semi-dynamic content | Fast |

---

## 1. SSR (Server-Side Rendering) 🖥️

### What is it?
- Page is rendered **on the server for EVERY request**
- Fresh data fetched with each page visit
- HTML is sent to the browser ready to display

### When to Use:
✅ User-specific content (dashboards, personalized feeds)  
✅ Real-time data (live prices, stock updates)  
✅ Authentication-dependent pages  
✅ Sensitive data that shouldn't be exposed in build  
✅ Highly dynamic content that changes frequently  

### Performance:
⚠️ Slower (server processes each request)  
⚠️ Cannot be cached at CDN  
✅ Always fresh data  

### Example 1: Basic SSR
```tsx
// app/products/page.tsx (Pages Router)
export async function getServerSideProps() {
    const res = await fetch('https://api.example.com/products');
    const products = await res.json();
    
    return {
        props: { products },
        // revalidate: false (default - no caching)
    };
}

export default function Products({ products }) {
    return (
        <div>
            <h1>All Products</h1>
            {products.map(p => (
                <div key={p.id}>
                    <h2>{p.name}</h2>
                    <p>${p.price}</p>
                </div>
            ))}
        </div>
    );
}
```

### Example 2: SSR with User-Specific Data
```tsx
// app/dashboard/page.tsx (Pages Router)
export async function getServerSideProps(context) {
    const { req } = context;
    const userId = req.headers['x-user-id']; // From auth
    
    const res = await fetch(`https://api.example.com/user/${userId}`);
    const userData = await res.json();
    
    return {
        props: { userData },
    };
}

export default function Dashboard({ userData }) {
    return (
        <div>
            <h1>Welcome {userData.name}!</h1>
            <p>Last login: {userData.lastLogin}</p>
        </div>
    );
}
```

### Example 3: App Router SSR (Server Component)
```tsx
// app/products/page.tsx (App Router)
// This is a Server Component by default
export default async function ProductsPage() {
    const res = await fetch('https://api.example.com/products');
    const products = await res.json();
    
    return (
        <div>
            <h1>All Products</h1>
            {products.map(p => (
                <div key={p.id}>{p.name}</div>
            ))}
        </div>
    );
}
```

---

## 2. SSG (Static Site Generation) ⚡

### What is it?
- Page is generated **once at build time**
- HTML file is created and reused for all requests
- Served from CDN for super-fast access

### When to Use:
✅ Blog posts (rarely change)  
✅ Documentation (static content)  
✅ Product listings (infrequent updates)  
✅ Marketing pages  
✅ Content that doesn't need real-time updates  

### Performance:
✅ Fastest (pre-rendered, CDN cached)  
✅ Can be cached globally  
❌ Stale data until rebuild  

### Example 1: Basic SSG
```tsx
// app/blog/[slug]/page.tsx (Pages Router)
export async function getStaticProps(context) {
    const { slug } = context.params;
    
    const res = await fetch(`https://api.example.com/blog/${slug}`);
    const post = await res.json();
    
    return {
        props: { post },
        revalidate: 3600, // Revalidate every hour (ISR)
    };
}

export async function getStaticPaths() {
    // Generate paths for these blog slugs at build time
    const res = await fetch('https://api.example.com/blog');
    const posts = await res.json();
    
    const paths = posts.map(post => ({
        params: { slug: post.slug },
    }));
    
    return {
        paths,
        fallback: 'blocking', // 'true', 'false', or 'blocking'
    };
}

export default function BlogPost({ post }) {
    return (
        <article>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </article>
    );
}
```

### Example 2: App Router SSG (Static Generation)
```tsx
// app/blog/[slug]/page.tsx (App Router)
export async function generateStaticParams() {
    const posts = await fetch('https://api.example.com/blog').then(r => r.json());
    
    return posts.map(post => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }) {
    const post = await fetch(`https://api.example.com/blog/${params.slug}`).then(r => r.json());
    
    return {
        title: post.title,
    };
}

export default async function BlogPost({ params }) {
    const post = await fetch(`https://api.example.com/blog/${params.slug}`).then(r => r.json());
    
    return (
        <article>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </article>
    );
}
```

### fallback Options Explained:
```tsx
export async function getStaticPaths() {
    const paths = [
        { params: { id: '1' } },
        { params: { id: '2' } },
    ];
    
    return {
        paths,
        // fallback: false     → 404 for unlisted paths (fastest)
        // fallback: true      → 404 quickly, then regenerate (ISR-like)
        // fallback: 'blocking'→ Generate on demand, then cache
    };
}
```

---

## 3. ISR (Incremental Static Regeneration) 🔄

### What is it?
- **Hybrid approach**: Built-in SSG with scheduled regeneration
- Page is generated at build time AND on-demand
- Regenerated in background at specified interval
- Always serves cache until regeneration complete

### When to Use:
✅ E-commerce products (updated occasionally)  
✅ Blog with comments (semi-dynamic)  
✅ News sites  
✅ Any static content with occasional updates  
✅ Balance between speed and freshness  

### Performance:
✅ Fast (pre-rendered/cached)  
✅ Automatic updates  
✅ Updates don't block user requests  

### Example 1: Basic ISR with revalidate
```tsx
// app/products/[id]/page.tsx (Pages Router)
export async function getStaticProps(context) {
    const { id } = context.params;
    
    const res = await fetch(`https://api.example.com/products/${id}`);
    const product = await res.json();
    
    return {
        props: { product },
        revalidate: 60, // Regenerate every 60 seconds
    };
}

export async function getStaticPaths() {
    const res = await fetch('https://api.example.com/products');
    const products = await res.json();
    
    const paths = products.slice(0, 10).map(p => ({
        params: { id: p.id.toString() },
    }));
    
    return {
        paths,
        fallback: 'blocking', // New products generated on first request
    };
}

export default function Product({ product }) {
    return (
        <div>
            <h1>{product.name}</h1>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
        </div>
    );
}
```

### Example 2: ISR with On-Demand Revalidation
```tsx
// app/api/revalidate/route.ts
export async function POST(request) {
    const secret = request.nextUrl.searchParams.get('secret');
    
    // Verify secret token
    if (secret !== process.env.REVALIDATE_SECRET) {
        return new Response('Invalid token', { status: 401 });
    }
    
    try {
        // Revalidate specific path
        await revalidatePath('/products/[id]');
        return Response.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        return Response.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
```

### Example 3: ISR in App Router
```tsx
// app/products/[id]/page.tsx (App Router)
export const revalidate = 60; // Regenerate every 60 seconds

export async function generateStaticParams() {
    const products = await fetch('https://api.example.com/products').then(r => r.json());
    
    return products.slice(0, 10).map(p => ({
        id: p.id.toString(),
    }));
}

export default async function ProductPage({ params }) {
    const product = await fetch(`https://api.example.com/products/${params.id}`).then(r => r.json());
    
    return (
        <div>
            <h1>{product.name}</h1>
            <p>${product.price}</p>
        </div>
    );
}
```

---

## Interview Common Questions & Answers

### Q: What's the difference between SSG and ISR?
**A:** 
- **SSG**: Generated once at build time, never changes unless rebuild
- **ISR**: Generated at build time, then regenerated on-demand after revalidate time expires
- ISR is better for content that updates occasionally

### Q: When would you use SSR instead of ISR?
**A:** When you truly need **real-time** data or **user-specific** content. ISR would be stale. Examples:
- User dashboards
- Live stock prices
- Authentication-dependent pages

### Q: What's revalidate: false?
**A:** It means no caching - equivalent to SSR. Page regenerates on every request.

### Q: What's the fallback option in getStaticPaths?
**A:** 
- `false`: Return 404 for paths not in getStaticPaths (fastest, safest)
- `true`: Return 404 initially, then regenerate in background (like ISR)
- `'blocking'`: Generate page on first request, then cache it (slower first request)

### Q: How do you handle newly added products in an e-commerce site?
**A:** Use ISR with `fallback: 'blocking'`. Pre-generate best sellers, new products generated on first request.

### Q: Can you have dynamic routes with SSG?
**A:** Yes, but you must define them in `getStaticPaths()`. Unknown paths depend on fallback setting.

### Q: What's better for SEO?
**A:** All three work for SEO, but SSG and ISR are better (faster = better Core Web Vitals)

---

## Quick Decision Tree

```
Does the page need user-specific data?
├─ YES → SSR (getServerSideProps)
└─ NO → Does content change frequently?
    ├─ YES (every request) → SSR
    └─ NO → Does it change occasionally?
        ├─ YES → ISR (getStaticProps + revalidate)
        └─ NO → SSG (getStaticProps)
```

---

## Performance Summary

| Method | Time to Page | Cache | Updated |
|--------|-------------|-------|---------|
| SSG | 10ms+ | ∞ | Never (rebuild) |
| ISR | 10ms+ | 60s (example) | Auto after interval |
| SSR | 500ms+ | ✗ | Always |

SSG/ISR are 50-100x faster than SSR! 🚀
