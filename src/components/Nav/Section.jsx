import { NavLink } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

import NavItem from "./Item";
import Search from "../Search/Section";
import Logout from "./Logout";

const Nav = () => {
    const { user, loading } = useAuth();

    return (
        <> 

            <nav className="navbar navbar-expand-lg bg-dark text-white">
                <div className="container-fluid">
                    {/* application name */}
                    <NavLink to="/" className="navbar-brand">
                        <img src="https://res.cloudinary.com/ellegacy/image/upload/v1715891079/zfjym17btc1ywyxq5xpv.png" className="img-fluid" id="app-logo" alt="application logo" width="45" />
                    </NavLink>
                    {/* nav bar toggler */}
                    <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={ {"--bs-scroll-height": "100px"} }>
                            <NavItem link="/" title="Home" />
                            <NavItem link="/login" title="Login" display={(user ? false : true)} />
                            <NavItem link="/register" title="Register" display={(user ? false : true)} />
                            {
                                ((!loading && user && user.role==="customer") || !user) && (<>
                                    <NavItem link="/sell-your-product" title="Sell your Product" />
                                    <NavItem link="/shopping-cart" title="Shopping Cart" />
                                </>)
                            }

                            {
                                user && (<>
                                    {
                                        user.role==="admin" && (<>
                                            <NavItem link="/dashboard/products" title="Products" />
                                            <NavItem link="/dashboard" title="Dashboard" />
                                        </>)
                                    }
                                    <NavItem link="/profile" title="Profile" display={(user.role==="customer" ? true : false)} />
                                    <Logout />
                                </>)
                            }
                        </ul>

                        <Search />
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Nav;