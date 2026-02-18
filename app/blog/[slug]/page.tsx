
import React from "react";

type Params = { slug?: string | string[] };

const Page = async ({ params }: { params?: any }) => {
    const resolvedParams: Params | undefined = await params;
    const rawSlug = resolvedParams?.slug;
    
    return (
        <>
            <h1>Blog Post</h1>
            <h2 className="text-[red]">{rawSlug}</h2>  
        </>
    );
};

export default Page;