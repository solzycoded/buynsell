import Product from "../models/Product.js";

const ProductService = (() => {
    const nameIsDuplicate = async (sellerId, name, productId = null) => {
        const product = await Product
            .findOne({ 
                seller: sellerId,
                name,
                _id: { $ne: productId }
            })
            .exec();

        return product ? true : false;
    }

    const findProduct = async (productId) => {
        const product = 
            await Product.findOne({ _id: productId })
            .populate("images")
            .populate("category", "name -_id")
            .exec();

        return product;
    }

    return {
        nameIsDuplicate,
        findProduct,
    }

})();

export default ProductService;

// GRASP PATTERNS
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
    4. indirection
*/