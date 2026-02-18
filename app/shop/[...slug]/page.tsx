
const Page = async ({params}: any) => {

  const slug =  await params;

  console.log(slug);

    return (
        <>
            <h1>Shop Page</h1>
            <h2>{slug?.slug[1]}</h2>
        </> 
    )
}

export default Page;  