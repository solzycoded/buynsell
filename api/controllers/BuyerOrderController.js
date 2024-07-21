import BuyerOrderService from "../services/BuyerOrderService.js";
import CustomerContactService from "../services/CustomerContactService.js";
import CustomerOrderService from "../services/CustomerOrderService.js";
import StripeService from "../services/Payment/StripeService.js";
import ShopppingCartService from "../services/ShoppingCartService.js";

const createOrder = async(req, res)  => {
    if(!req.session.user.order){
        res.status(500).json({ success: false, data: "You're not authorized to perform this action!" });
        return;
    }

    const { paymentId } = req.body;

    if(!paymentId) {
        res.status(400).json({ success: false, data: "Payment Id is missing" });
        return;
    }

    try {
        const user = req.session.user.id;
        const cart = await ShopppingCartService.listOfCartItems(user, false); // get all of the items in cart with quantity greater than 0

        if(cart.length > 0){
            const { email, phone, deliveryAddress } = req.session.user.order;

            // create / update customer contact
            await CustomerContactService.createNewCustomerContact(email, phone, user);

            const order = await BuyerOrderService.createNewOrder(deliveryAddress, user, paymentId);

            await CustomerOrderService.storeCustomerOrder(user, cart, order, res);

            // delete the order from the user session
            delete req.session.user.order;

            // empty user's cart
            ShopppingCartService.emptyCart(user);
        }
        else{
            res.status(201).json({ success: false, data: "You do not have any item in your shopping cart!" });
        }

        return;
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const createPreOrder = async(req, res) => {
    const { deliveryOption, deliveryAddress, email, phone } = req.body;

    if(!deliveryOption || !deliveryAddress || !phone) {
        res.status(400).json({ success: false, data: "You've not provided all of the necessary information!" });
        return;
    }

    try {
        // create customer order session
        req.session.user.order = { email, phone, deliveryAddress, deliveryOption };

        res.status(201).json({ success: true, data: "Order has been saved!" });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const initiateStripePayment = async(req, res) => {
    const { amount } = req.body;

    if(!amount) {
        res.status(400).json({ success: false, data: "Amount must be provided!" });
        return;
    }

    try {
        StripeService.createPaymentInstance(amount, res);
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const getOrders = async(req, res) => {
    try {
        const { limit } = req.params;
        const user      = req.session.user.id;

        const orders    = await BuyerOrderService.listOfBuyerOrders(user, limit);

        res.status(202).json({ success: (orders.length > 0), data: orders });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const cancelOrder = async(req, res) => {
    const { orderId } = req.body;

    if(!orderId){
        res.status(403).json({ success: false, data: "Order id is missing!" });
        return;
    }

    try {
        const user = req.session.user.id;
        await BuyerOrderService.cancelBuyerOrder(orderId, user);

        res.status(202).json({ success: true, data: "Your order was successfully cancelled" });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const BuyerOrderController = { 
    createOrder,
    createPreOrder,
    initiateStripePayment,
    getOrders,
    cancelOrder,
}

export default BuyerOrderController;