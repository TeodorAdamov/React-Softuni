import { Outlet } from "react-router-dom"
import Header from "../header/Header"
import Footer from "../footer/Footer"

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex justify-center py-5">
                <Outlet />
            </main>
            <Footer />
        </div>

    )
}

export default Layout