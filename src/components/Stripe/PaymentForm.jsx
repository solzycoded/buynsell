import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import FetchRequest from '../../assets/js/request/fetch';
import PaymentConfirmation from './PaymentConfirmation';
import OrderConfirmation from '../Orders/OrderConfirmation';
import App from '../../assets/js/app';

const PaymentForm = ({ amount }) => {
    const stripe                              = useStripe();
    const elements                            = useElements();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [message, setMessage]               = useState(null);
    const [order, setOrder]                   = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const { id } = paymentMethod;

            const makePayment = () => {
                const success = async (data) => {
                    const clientSecret = data.clientSecret;
                    stripe
                    .confirmCardPayment(clientSecret, {
                        payment_method: id
                    })
                    .then((result) => {
                        // open confirmation modal
                        document.getElementById("payment-confirmation").click();

                        setMessage("Your payment was successful!");
                        setPaymentSuccess(true);

                        // get payment id and finalize user order
                        const paymentId = result.paymentIntent.id;
                        finalizeOrder(paymentId); // create the user's order
                    })
                    .catch((e) => {
                        console.log(e);
                        setMessage("Your payment was not successful. Something is wrong.");
                        setPaymentSuccess(false);
                    });
                }

                const failure = (data) => {
                    App.showAlert(false, data);
                }

                (new FetchRequest("POST", "orders/initiate-stripe-payment", { amount })).send(success, failure);
            }

            makePayment();

            const finalizeOrder = (paymentId) => {
                const success = async (data) => {
                    const order = data.order;
                    setOrder(order);

                    document.querySelector("#paymentConfirmation").classList.add("d-none");
                    document.querySelector("#order-confirmation-btn").click();
                }

                const failure = (data) => {
                    console.log(data);
                }

                (new FetchRequest("POST", "orders", { paymentId })).send(success, failure);
            }
        }
        else {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    {message}
                    <CardElement />
                    <div className='mt-3 text-end'>
                        <button type="submit" disabled={!stripe} className='btn btn-dark'>Pay</button>
                    </div>
                </form>
            </div>

            <PaymentConfirmation success={paymentSuccess} message={message} />
            <OrderConfirmation order={order} />
        </>
    );
};

export default PaymentForm;