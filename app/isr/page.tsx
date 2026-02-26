// ==================== ISR (Incremental Static Regeneration) ====================
// Renders at BUILD TIME, then regenerates on-demand after revalidate interval
// Use: E-commerce, news sites, content with occasional updates

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    lastUpdated: string;
}

const ISRPage = ({ products, buildTime }: { products: Product[], buildTime: string }) => {
    return (
        <div>
            <h1>ISR - Incremental Static Regeneration</h1>
            <p>🔄 Hybrid approach: Built once, regenerates automatically</p>
            <p>⚡ Fast like SSG, fresh like SSR</p>
            <p>✅ Revalidates every 60 seconds in background</p>
            
            <div style={{ backgroundColor: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
                <strong>Page built at:</strong> {buildTime}
            </div>
            
            <h2>Products (Regenerated Every 60 Seconds):</h2>
            {products.map(product => (
                <div key={product.id} style={{ border: '2px solid #0070f3', padding: '15px', margin: '10px 0' }}>
                    <h3>{product.name}</h3>
                    <p>💰 Price: ${product.price}</p>
                    <p>📦 Stock: {product.stock} units</p>
                    <small>Last updated: {product.lastUpdated}</small>
                </div>
            ))}
            
            <div style={{ marginTop: '30px', backgroundColor: '#fff3cd', padding: '10px' }}>
                <h3>How ISR Works:</h3>
                <ol>
                    <li>Page is generated at BUILD TIME</li>
                    <li>Served from cache to all users (FAST!)</li>
                    <li>After 60 seconds, page is marked stale</li>
                    <li>Next user request triggers regeneration</li>
                    <li>While regenerating, old version is served</li>
                    <li>User never sees loading state</li>
                </ol>
            </div>
        </div>
    )
}

// Generated at BUILD TIME, regenerated every 60 seconds
export async function getStaticProps() {
    console.log('ISR: Generating page at', new Date().toISOString());
    
    // Fetch data
    const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=5');
    const comments = await response.json();
    
    // Transform into products
    const products: Product[] = comments.map((comment: any) => ({
        id: comment.id,
        name: `Product ${comment.id}`,
        price: Math.floor(Math.random() * 100) + 10,
        stock: Math.floor(Math.random() * 100),
        lastUpdated: new Date().toLocaleTimeString()
    }));
    
    return {
        props: {
            products,
            buildTime: new Date().toISOString(),
        },
        revalidate: 60, // ISR: Regenerate every 60 seconds
    };
}

export default ISRPage;
