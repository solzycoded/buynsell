import { NavLink } from "react-router-dom";
import CartItem from "./Item";

const Cart = ({ cartItems }) => {
    return (
        <>
            <div className="row">
                {
                    (cartItems.length > 0) && (cartItems.map((cartItem, i) => {
                        return (
                            <CartItem key={ i } product={ cartItem.product } quantity={ cartItem.quantity } />
                        )
                    }))
                }
                {
                    (cartItems.length===0) && (
                        <div>You currently do not any items in your shopping cart. <NavLink to={"/"}>Add some here</NavLink></div>
                    )
                }
            </div>
        </>
    )
}

export default Cart;