import Product from "../models/Product.js";

const IndexProductService = (() => {
    const customerListOfProducts = async (search = "", status = "") => {
        const products = 
            await Product.find({
                name: {
                    $regex: new RegExp(search, 'i') // 'i' for case-insensitive search
                }
            })
            .populate("category", "name _id")
            .populate("images", "image -_id")
            .populate({
                path: "product_status",
                populate: {
                    path: "status",
                    match: { name: status },
                }
            })
            .exec();

        const filteredProducts = filterProductsByStatus(products);

        return filteredProducts;
    }

    const filterProductsByStatus = (products) => {
        const filteredProducts = products.filter((parent) => {
            let productStatus = parent.product_status.filter((child) => {
                return child.status !== null;
            }); // check if the status field isn't null and return a row only if it's true

            return productStatus.length > 0;
        });

        return filteredProducts;
    }

    const filterProductsByCategory = (products) => {
        const filteredProducts = products.filter((parent) => {
            return parent.category!==null;
        });

        return filteredProducts;
    }

    const adminListOfProducts = async (search = "", category = "", status = "") => {
        const products = 
            await Product.find({
                name: {
                    $regex: new RegExp(search, 'i') // 'i' for case-insensitive search
                }
            })
            .populate({
                path: "category",
                match: { _id: category },
            })
            .populate("images", "image -_id")
            .populate({
                path: "product_status",
                populate: {
                    path: "status",
                    match: { _id: status },
                }
            })
            .exec();

        let filteredProducts = filterProductsByStatus(products); // filter by status
        filteredProducts     = filterProductsByCategory(filteredProducts); // filter by category

        return filteredProducts;
    }

    return {
        customerListOfProducts,
        adminListOfProducts,
    }
})();

export default IndexProductService;

// GRASP PATTERNS
/* 
    1. indirection
    2. high cohesion
    3. low coupling
    4. pure fabrication
*/