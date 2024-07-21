import { useState } from "react";
import CartItemTotal from "./Total";
import FetchRequest from "../../assets/js/request/fetch";

const CartItemCounter = ({ productId, maxQuantity, quantity, price }) => {
    const [ itemQuantity, setItemQuantity ] = useState(quantity);

    const updateQuantity = (quantity) => {
        const success = (data) => {
            setItemQuantity(quantity); // update itemQuantity
        }

        const failure = (data) => {
            console.log(data);
        }

        const data = { quantity };
        (new FetchRequest("PUT", `shopping-cart/${productId}`, data)).send(success, failure);
    }

    const manageQuantity = (decrease) => {
        quantity = null;

        // decrease quantity if decrease===true else INCREASE IT
        if(decrease){
            if(itemQuantity > 0) {
                quantity = itemQuantity - 1;
            }
        }
        else{
            if(itemQuantity < maxQuantity){
                quantity = itemQuantity + 1;
            }
        }

        if(quantity!==null){ // update the quantity in the database, if "quantity" value, was updated
            updateQuantity(quantity);
        }
    }

    return (
        <>
            <div className="cart-item-counter">
                <button className="p-0 m-0 border border-2 border-dark text-black bg-transparent fw-bold" onClick={ () => manageQuantity(true) }>
                    <i className="bi bi-dash"></i>
                </button>

                <span className="ms-2 me-2 text-dark product-quantity">
                    { itemQuantity }
                </span>

                {/* the counter can't exceed the "max no of items" */}
                <button className="p-0 m-0 border border-2 border-dark text-dark bg-transparent fw-bold" onClick={ () => manageQuantity(false) }>
                    <i className="bi bi-plus"></i>
                </button>
            </div>
            <CartItemTotal price={ price } quantity={ itemQuantity } />
        </>
    )
}

export default CartItemCounter;