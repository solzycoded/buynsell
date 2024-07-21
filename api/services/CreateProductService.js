import Product from "../models/Product.js";

const CreateProductService = (() => {
    const createProduct = async (productDetails) => {
        const newProduct = new Product({ 
            name: productDetails.name, 
            available_quantity: productDetails.quantity, 
            price: productDetails.price, 
            details: productDetails.details, 
            category: productDetails.category, 
            seller: productDetails.seller.id
        });

        await newProduct.save();

        return newProduct;
    }

    return {
        createProduct,
    }

})();

export default CreateProductService;