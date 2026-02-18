
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="layout-wrapper bg-gray-100 p-4 w-full"> 
                <header className="bg-black text-white p-10">
                    <h1>Header</h1>
                </header>
                {children}
                <footer className="bg-black bg-black text-white p-10">  
                    <h1>Footer</h1> 
                </footer>
            </div>
        </>
    )
}

export default Layout;  