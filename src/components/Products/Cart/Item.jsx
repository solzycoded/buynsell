import { useEffect, useState } from "react";
import FetchRequest from "../../../assets/js/request/fetch.js";
import { useAuth } from "../../Auth/AuthContext.jsx";
import App from "../../../assets/js/app.js";

const CartButton = ({ productId }) => {
    const [inCart, setInCart]                 = useState(false);
    const [cartBtnContent, setCartBtnContent] = useState("Add to Cart");
    const [cartBtnIcon, setCartBtnIcon]       = useState("plus");
    const [cartBtnColor, setCartBtnColor]     = useState("dark");

    const { user, loading }                   = useAuth();

    useEffect(() => {
        if(!loading && user){
            checkIfProductInCart();
        }
    }, [loading, user]);

    // check if product exists and make the product display either "remove from cart" or "add to cart"
    const checkIfProductInCart = () => {
        const success = (data) => {
            setInCart(data.inCart);
            updateCartBtnDisplay(data.inCart);
        }

        const failure = (data) => {
            // console.log("failure", data);
        }

        (new FetchRequest("GET", `shopping-cart/confirm/${productId}`)).send(success, failure);
    }

    // add to or remove product from cart
    const toggleCart = () => {
        if(!loading && !user){
            App.showAlert(false, "You can't add a product to cart until you Login.");
            return;
        }

        const success = (data) => {
            updateCartBtnDisplay(!inCart);
            setInCart(!inCart);

            App.showAlert(true, data);
        }

        const failure = (data) => {
            App.showAlert(false, data);
        }

        (new FetchRequest("POST", "shopping-cart", { productId })).send(success, failure);
    }

    // set the content of the cart (depending on if it's already in cart or if it needs to be added to one)
    const updateCartBtnDisplay = (productInCart) => {
        if(productInCart){
            setCartBtnContent("Remove from Cart");
            setCartBtnIcon("dash");
            setCartBtnColor("secondary");
        }
        else{
            setCartBtnContent("Add to Cart");
            setCartBtnIcon("plus");
            setCartBtnColor("dark");
        }
    }

    return (
        <>
            <div>
                {/* add to or remove from cart */}
                <button type="button"
                    className={`btn btn-${cartBtnColor} fw-bold`}
                    onClick={toggleCart}>
                    {cartBtnContent} <i className={`bi bi-cart-${cartBtnIcon}`}></i>
                </button>
            </div>
        </>
    )
}

export default CartButton;