import { useEffect, useState } from "react";
import FetchRequest from "../assets/js/request/fetch";
import PaymentForm from "../components/Stripe/PaymentForm";

const StripePayment = () => {
    const [ amount, setAmount ] = useState(0);

    useEffect(() => {
        getOrderAmount();
    }, []);

    const getOrderAmount = () => {
        const success = (data) => {
            setAmount(data.amount);
        }

        const failure = (data) => {
            console.log(data);
        }

        (new FetchRequest("GET", "shopping-cart/total")).send(success, failure);
    }

    return (
        <>
            <section>
                <div className="container-fluid p-4">
                    <div className="mb-2">
                        <h4>Strip Payment Checkout</h4>
                    </div>
                    
                    <div className="mb-2">
                        <p><b>TOTAL AMOUNT TO BE DEBITED:</b> £{amount}</p>
                    </div>
                    <div className="mb-4">
                        <PaymentForm amount={amount} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default StripePayment;