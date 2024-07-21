import { useEffect, useState } from "react";

import FetchRequest from "../assets/js/request/fetch.js";

import "../assets/css/shopping-cart.css"
import Cart from "../components/ShoppingCart/Section.jsx";
import { NavLink } from "react-router-dom";
import { useAuth } from "../components/Auth/AuthContext.jsx";

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError]         = useState("");

    const { user, loading }         = useAuth();

    useEffect(() => {
        if(!loading && user){
            getShoppingCartItems();
        }
    }, []);

    const getShoppingCartItems = () => {
        const success = (data) => {
            setCartItems(data);
            setError("");
        }

        const failure = (data) => {
            setError(data);
        }

        (new FetchRequest("GET", "shopping-cart")).send(success, failure);
    }

    return (
        <>
            <section className="mt-20">
                <div>
                    <h5>Shopping Cart ({ cartItems.length })</h5>
                    <p className={`text-end ${(cartItems.length > 0 ? "" : "d-none")}`}><NavLink to={ "/checkout" } className="btn btn-dark">Checkout <i className="bi bi-arrow-right"></i></NavLink></p>
                </div>
                <div className="mt-4 container-fluid p-0">
                    {
                        !error &&
                        (<Cart cartItems={ cartItems } />)
                    }
                    {
                        error && <div>{ error } Kindly <NavLink to="/login">Login</NavLink> to view your shopping cart.</div>
                    }
                </div>
            </section>
        </>
    )
}

export default ShoppingCart;