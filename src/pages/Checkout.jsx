import { NavLink, useNavigate } from "react-router-dom";
import CheckoutCart from "../components/Checkout/Cart/Section";
import DeliveryDetails from "../components/Checkout/Delivery/Section";
import { useEffect, useState } from "react";
import FetchRequest from "../assets/js/request/fetch";
import App from "../assets/js/app";

const Checkout = () => {
    const [ customerEmail, setCustomerEmail ] = useState("");
    const [ customerPhone, setCustomerPhone ] = useState("");
    const [ error, setError ]                 = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getCustomerContact();
    }, []);

    const getCustomerContact = (quantity) => {
        const success = (data) => {
            setCustomerEmail(data.email);
            setCustomerPhone(data.phone);
        }

        const failure = (data) => {
            setCustomerEmail("");
            setCustomerPhone("");
        }

        (new FetchRequest("GET", `customer-contacts`)).send(success, failure);
    }

    const placeOrder = () => {
        // delivery / pickup
        let deliveryOption = document.querySelector('input[name="delivery_option"]:checked');
        let deliveryAddress = document.querySelector('input[name="delivery_address"]:checked');

        if(deliveryOption){
            setError("");
            if(deliveryAddress){
                setError("");
                deliveryAddress = deliveryAddress.value;
            }
            else{
                const message = "You need to select a delivery address!";

                setError(message);
                App.showAlert(false, message);
            }

            deliveryOption = deliveryOption.value;
        }
        else{
            const message = "You need to select a delivery option!";

            setError(message);
            App.showAlert(false, message);
        }

        if(!customerPhone){
            App.showAlert(false, "You need to provide a phone number");
        }

        if(deliveryOption && deliveryAddress && customerPhone){
            const data = {deliveryOption, deliveryAddress, email: customerEmail, phone: customerPhone};

            createOrder(data); 
        }
    }

    const createOrder = (data) => {
        const success = (data) => {
            navigate("stripe-payment");
        }

        const failure = (data) => {
            App.showAlert(false, data);
        }

        (new FetchRequest("POST", `orders/pre`, data)).send(success, failure);
    }

    return (
        <>
            <section>
                <div className="mb-3">
                    <h3>Checkout</h3>
                    <hr />
                </div>

                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-danger m-0 mb-1">{error}</p>
                        </div>

                        <div className="col-12 col-md-7 col-lg-8">
                            {/* delivery */}
                            <DeliveryDetails />

                            {/* contact details */}
                            <div className="mt-4">
                                <h5>Provide contact details</h5>
                                <div className="mt-3">
                                    <div className="form-floating mb-2">
                                        <input type="email" className="form-control" id="delivery-email-address" placeholder="Provide an email address" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                                        <label htmlFor="delivery-email-address">Email Address</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="phone" className="form-control" id="delivery-phone-number" placeholder="Provide a phone number" maxLength="11" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                                        <label htmlFor="delivery-phone-number">Phone Number</label>
                                    </div>
                                </div>
                            </div>
                            {/* payment options */}
                            <div className="mt-4">
                                <h5>Select Payment Option</h5>
                                <div>
                                    <div className="form-check">
                                        <input className="form-check-input" 
                                            type="radio" 
                                            name="payment_option" 
                                            id="pay-now"
                                            defaultChecked />
                                        <label className="form-check-label" htmlFor="pay-now">
                                            Pay Now
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* cart */}
                        <div className="col-12 col-md-5 col-lg-4">
                            <div className="mb-2">
                                <h4>Shopping Cart <NavLink to="/shopping-cart" className="btn btn-transparent border-0 fw-bold fs-4"><i className="bi bi-arrow-right"></i></NavLink></h4>
                            </div>
                            <CheckoutCart />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="text-end mt-4">
                    <button className="btn btn-dark" onClick={placeOrder}>Place Order <i className="bi bi-arrow-right"></i></button>
                </div>
            </section>
        </>
    )
}

export default Checkout;