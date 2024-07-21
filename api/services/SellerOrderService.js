import Order from "../models/Order.js";

const SellerOrderService = (() => {
    const listOfOrders = async (user, limit = 0) => {
        const orders = await Order.find()
            .populate({
                path: "address",
                populate: {
                    path: "post_code",
                    populate: {
                        path: "city",
                        populate: {
                            path: "country",
                        }
                    }
                },
                select: "address"
            })
            .populate({
                path: "customer_orders",
                populate: {
                    path: "product",
                    match: { seller: user },
                    populate: [
                        { path: "images"},
                        { path: "category"},
                    ]
                }
            })
            .populate({
                path: "user",
                populate: [
                    {
                        path: "profile",
                        select: "business_name",
                    },
                    {
                        path: "contact",
                        select: "phone",
                    }
                ],
                select: "name"
            })
            .limit(limit)
            .exec();

        const filteredOrders = orders.filter((parent) => {
            let customerOrders = parent.customer_orders.filter((child) => {
                return child.product !== null;
            }); // check if the product field isn't null and return a row only if it's true

            return customerOrders.length > 0;
        });

        return filteredOrders;
    }

    const findOrder = async (user, orderId) => {
        let order = await Order.findOne({ _id: orderId })
            .populate({
                path: "customer_orders",
                populate: {
                    path: "product",
                    populate: {
                        path: "seller",
                        match: { _id: user },
                    }
                }
            })
            .exec();

        const customerOrders = order.customer_orders.filter((parent) => {
            return parent.product.seller!==null;
        });

        return (customerOrders.length > 0 ? order : null);
    }

    const updateOrder = async (orderId, deliveryDate, deliveryStatus) => {
        await Order
            .findByIdAndUpdate(orderId, 
            {
                deliver_before: deliveryDate, 
                delivery_status: deliveryStatus
            })
            .exec();
    }

    return {
        listOfOrders,
        findOrder,
        updateOrder,
    }
})();

export default SellerOrderService;

// GRASP PATTERNS
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
    4. indirection??
*/