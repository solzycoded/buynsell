import { Outlet } from "react-router-dom";

import Nav from "../components/Nav/Section.jsx";
import Alert from "../components/Alert/Section.jsx";

const Layout = () => {
    return (
        <>
            <Nav />
            <main id="main" className="mb-5">
                <Outlet />
            </main>

            <Alert />
        </>
    )
}

export default Layout;