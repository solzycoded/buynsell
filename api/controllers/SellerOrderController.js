import SellerOrderService from "../services/SellerOrderService.js";

const getOrders = async(req, res) => {
    try {
        const { limit } = req.params;
        const user      = req.session.user.id;

        const orders    = await SellerOrderService.listOfOrders(user, limit);

        res.status(202).json({ success: (orders.length > 0), data: orders });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const getOrder = async(req, res) => {
    const { orderId } = req.params;

    if(!orderId){
        res.status(403).json({ success: false, data: "Order id is missing" });
        return;
    }

    try {
        const user  = req.session.user.id;
        const order = await SellerOrderService.findOrder(user, orderId);

        if(!order){
            res.status(202).json({ success: false, data: "You're not authorized to update this order or this order does not exist!" });
            return;
        }

        res.status(202).json({ success: true, data: order });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const updateOrder = async(req, res) => {
    const { orderId }                      = req.params;
    const { deliveryDate, deliveryStatus } = req.body;

    if(!orderId || !deliveryDate) {
        res.status(403).json({ success: false, data: "Order id or delivery date is missing" });
        return;
    }

    try {
        await SellerOrderService.updateOrder(orderId, deliveryDate, deliveryStatus);

        res.status(202).json({ success: true, data: "Your order was successfully updated!" });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

// export CONTROLLER
const SellerOrderController = {
    getOrders,
    getOrder,
    updateOrder,
}

export default SellerOrderController;

// GRASP PATTERNS
/* 
    1. controller
    2. high cohesion
*/