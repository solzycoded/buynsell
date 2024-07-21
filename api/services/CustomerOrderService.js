import CustomerOrder from "../models/CustomerOrder.js";

const CustomerOrderService = (() => {
    const storeCustomerOrder = async (user, shoppingCart, order, res) => {
        const data = createCustomerOrders(user, shoppingCart, order);

        CustomerOrder.insertMany(data)
            .then((docs) => {
                res.status(201).json({ success: true, data: { order } });
            })
            .catch((err) => {
                console.error('Error inserting records: ', err);
                res.status(500).json({ success: false, data: err });
            });
    }

    const createCustomerOrders = (user, shoppingCart, order) => {
        let customerOrders = [];

        shoppingCart.forEach(cartItem => {
            let product       = cartItem.product;
            let customerOrder = { user, quantity: cartItem.quantity, price: product.price, product: product.id, order };

            customerOrders.push(customerOrder);
        });

        return customerOrders;
    }

    return {
        storeCustomerOrder,
    }

})();

export default CustomerOrderService;

// GRASP PATTERNS
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
    4. indirection??
*/