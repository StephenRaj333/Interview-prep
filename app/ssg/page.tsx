// ==================== SSG (Static Site Generation) ====================
// Renders ONCE at build time
// Use: Blog posts, documentation, static content, marketing pages

interface BlogPost {
    id: number;
    title: string;
    content: string;
    author: string;
}

const SSGPage = ({ posts }: { posts: BlogPost[] }) => {
    return (
        <div>
            <h1>SSG - Static Site Generation</h1>
            <p>⚡ This page is generated at BUILD TIME and cached globally</p>
            <p>✅ Super fast - served from CDN</p>
            <p>❌ Content only updates on rebuild</p>
            
            <h2>Blog Posts (Static Content):</h2>
            {posts.map(post => (
                <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <small>By {post.author}</small>
                </div>
            ))}
        </div>
    )
}

// Generated at BUILD TIME - runs once
export async function getStaticProps() {
    console.log('SSG: Building static page...');
    
    // Fetch data at build time
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const posts = await response.json();
    
    // Transform data if needed
    const formattedPosts = posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.body,
        author: `User ${post.userId}`
    }));
    
    return {
        props: {
            posts: formattedPosts,
        },
        revalidate: 86400, // Revalidate every 24 hours (example of ISR)
    };
}

export default SSGPage;
