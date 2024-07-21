import { useState } from "react";
import { NavLink } from "react-router-dom";
import BuyerOrders from "./Buyer/Section";
import SellerOrders from "./Seller/Section";

const MyOrders = () => {
    const [ buyerOrderActive, setBuyerOrderActive ] = useState(true);

    const goToOrderSection = (targetSection) => {
        const buyerOrderIsActive = targetSection==="buyer" ? true : false;

        setBuyerOrderActive(buyerOrderIsActive);
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h5>My Orders</h5>
                    <div className="d-flex justify-content-start mt-2">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <button className={`nav-link ${(buyerOrderActive ? "active" : "")}`} aria-current="page" onClick={() => goToOrderSection("buyer")}>As a Buyer</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${(buyerOrderActive ? "" : "active")}`} aria-current="page" onClick={() => goToOrderSection("seller")}>As a Seller</button>
                            </li>
                        </ul>
                    </div>
                    <hr />
                </div>
                <div className={`col-12 container-fluid ${(buyerOrderActive ? "" : "d-none")}`} id="buyer-orders">
                    <div className="row">
                        <BuyerOrders />
                    </div>
                </div>
                <div className={`col-12 container-fluid ${(buyerOrderActive ? "d-none" : "")}`} id="seller-orders">
                    <div className="row">
                        <SellerOrders />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyOrders;