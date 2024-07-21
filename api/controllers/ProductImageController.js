import ProductImageService from "../services/ProductImageService.js";

const create = async(req, res)  => {
    if(!req.session.user){
        res.status(500).json({ success: false, data: "You're not authorized to perform this action!" });
        return;
    }

    if(!req.files){
        res.status(201).json({ success: false, data: "No product image was provided!" });
        return;
    }

    const { productId } = req.params;

    if(!productId) {
        res.status(400).json({ success: false, data: "Product is missing" });
        return;
    }

    try {
        const images = req.files;
        await ProductImageService.storeProductImage(productId, images, res);

        return;
    } catch (error) {
        console.log(error); 
        res.status(202).json({ success: false, data: error.message });
    }
};

const destroy = async(req, res)  => {
    const { productImageId } = req.params;

    if(!productImageId) {
        res.status(400).json({ success: false, data: "Product Image Id is missing" });
        return;
    }

    try {
        await ProductImageService.deleteProductImage(productImageId, res);

        return;
    } catch (error) {
        console.log(error); 
        res.status(202).json({ success: false, data: error.message });
    }
};

// export CONTROLLER
const ProductImageController = {
    create,
    destroy,
}

export default ProductImageController;

// GRASP PATTERNS
/* 
    1. controller
    2. high cohesion
*/