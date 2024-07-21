import Stripe from "stripe";

const StripeService = (() => {

    const createPaymentInstance = async (amount, res) => {
        const stripe = new Stripe("sk_test_51PXRbhKM7NIzWApUxhqynqNRHo7in5zmz1ZWqbMlTdfqW2r5qwz8Yfu0sGc9zVdY8jeO6sZIwmYU9V1IgffH6ZTI00Y7OHltbk");

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'gbp',
        });

        res.status(200).send({
            success: (paymentIntent.client_secret ? true : false), data: { clientSecret: paymentIntent.client_secret },
        });
    }

    return {
        createPaymentInstance,
    }
})();

export default StripeService;

// GRASP PATTERNS
/*
    1. high cohesion
    2. pure fabrication
    3. low coupling
    4. indirection
*/