import CustomerOrder from "../models/CustomerOrder.js";
import Product from "../models/Product.js";

const UserProductService = (() => {
    const listOfProducts = async (user = null, limit) => {
        const products = 
            await Product.find({ 
                seller: user
            })
            .populate("category", "name _id")
            .populate("images", "image -_id")
            .populate({
                path: "product_status",
                populate: {
                    path: "status",
                    select: "name -_id",
                }
            })
            .limit(limit)
            .exec();

        return products;
    }

    const productHasPendingOrder = async (product) => {
        const orders = await CustomerOrder.find({
                product,
            })
            .populate({
                path: "order",
                match: { delivered_on: null, cancelled: false },
            })
            .exec();

        const filteredOrders = orders.filter(parent => parent.order !== null);

        return filteredOrders.length > 0;
    }

    const deleteProduct = async (productId) => {
        await Product.deleteOne({_id: productId});
    }

    const findProduct = async (productId, user) => {
        const product = await Product
            .findOne({ _id: productId, seller: user })
            .populate("images")
            .exec();

        return product;
    }

    const validateProduct = async (productId, user) => {
        const product = findProduct(productId, user);

        return product ? true : false;
    }

    const updateProduct = async (name, quantity, price, details, category, productId) => {
        await Product.findByIdAndUpdate(productId, { name, quantity, price, details, category });
    }

    return {
        validateProduct,
        listOfProducts,
        productHasPendingOrder,
        deleteProduct,
        findProduct,
        updateProduct,
    }

})();

export default UserProductService;

// GRASP PATTERNS
/* 
    1. indirection
    2. high cohesion
    3. low coupling
    4. pure fabrication
*/