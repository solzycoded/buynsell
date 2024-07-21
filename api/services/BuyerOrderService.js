import Order from "../models/Order.js";

const BuyerOrderService = (() => {
    const createNewOrder = async (address, user, paymentId) => {
        const order = new Order({ address, user, payment_id: paymentId });

        order.save();

        return order._id;
    }

    const listOfBuyerOrders = async (user, limit = 0) => {
        const orders = await Order.find({ user })
            .populate({
                path: "customer_orders",
                populate: {
                    path: "product",
                    populate: [
                        { path: "images" },
                        { path: "category" }
                    ]
                }
            })
            .limit(limit)
            .exec();

        return orders;
    }

    const cancelBuyerOrder = async (order, user) => {
        const result = await Order.updateOne({ _id: order, user }, { cancelled: true }, { runValidators: true }).exec();

        return result;
    }

    return {
        createNewOrder,
        listOfBuyerOrders,
        cancelBuyerOrder,
    }

})();

export default BuyerOrderService;

// GRASP PATTERNS
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
    4. indirection??
*/