

// ==================== SSR (Server-Side Rendering) ====================
// Renders on EVERY request on the server
// Use: Dynamic content, real-time data, user-specific content, SEO with frequently changing data

interface Product {
    id: number;
    name: string;
    price: number;
}
 
// Example 1: Basic SSR with getServerSideProps
const SSRPage = ({ products }: { products: Product[] }) => {
    return (
        <div>
            <h1>SSR - Server-Side Rendering</h1>
            <h2>Products (Rendered on each request):</h2>
            {products.map(product => (
                <div key={product.id}>
                    <p>{product.name} - ${product.price}</p>
                </div>
            ))}
        </div>
    )
}

// Runs on EVERY request - server-side only
export async function getServerSideProps() {
    try {
        // Fetch fresh data on every request from API
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=5');
        const data = await response.json();
        
        // Transform the data into Products
        const products: Product[] = data.map((item: any, index: number) => ({
            id: item.id,
            name: `Product ${index + 1} - ${item.name}`,
            price: Math.floor(Math.random() * 100) + 10
        }));
        
        return {
            props: {
                products,
            },
            revalidate: false, // No caching - truly SSR
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        return {
            props: {
                products: [],
            },
            revalidate: false,
        };
    }
}

export default SSRPage; 