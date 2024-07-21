import { NavLink } from "react-router-dom";
import CartItem from "./Item";
import { useEffect, useState } from "react";
import FetchRequest from "../../../assets/js/request/fetch";

const CheckoutCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal]         = useState(0);
    const [error, setError]         = useState("");

    useEffect(() => {
        getShoppingCartItems();
    }, []);

    const getShoppingCartItems = () => {
        const success = (data) => {
            setCartItems(data);
            calculateCartTotalPrice(data);
        }

        const failure = (data) => {
            setError(data);
        }

        (new FetchRequest("GET", "shopping-cart")).send(success, failure);
    }

    const calculateCartTotalPrice = (cartItems) => {
        let itemTotalPrice = 0;

        cartItems.forEach((item) => {
            itemTotalPrice += item.product.price * item.quantity;
            setTotal(itemTotalPrice);
        });
    }

    return (
        <>
            <div style={{"maxHeight": "500px", "overflowY": "auto"}}>
                {
                    cartItems.map((cartItem, i) => {
                        return (
                            <CartItem key={ i } product={ cartItem.product } quantity={ cartItem.quantity } />
                        )
                    })
                }
                {
                    error && (
                        <div>{error} You need to <NavLink to="login">Login</NavLink> to see your shopping cart.</div>
                    )
                }
            </div>
            <div className="mt-2 fw-bold fs-5 text-end">
                <span className="fw-bolder">TOTAL:</span> £{total}
            </div>
        </>
    )
}

export default CheckoutCart;