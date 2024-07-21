import ProductStatusService from "../services/ProductStatusService.js";

const productStatus = async(req, res) => {
    if(req.session.user.role!=="admin"){
        res.status(403).json({ success: false, data: "You're not allowed to perform this action!" });
        return;
    }

    let { status, product, reason } = req.body;

    if(!status || !product) {
        res.status(500).json({ success: false, message: "Some fields are missing" });

        return;
    }

    try {
        // find product status document, by providing product
        let productStatus = await ProductStatusService.findByProductId(product);
        status            = await ProductStatusService.findStatusId(status);

        // IF...
        if(productStatus){ // it exists, update the product status document
            await ProductStatusService.updateProductStatus({ id: productStatus.id, status, product, reason });
        }
        else{ // ELSE... create a new oned
            await ProductStatusService.createProductStatus({ status, product, reason });
        }

        res.status(201).json({ success: true, data: "Product status was successfully updated!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: error.message });
    }
};

// export CONTROLLER
const ProductStatusController = {
    productStatus
}

export default ProductStatusController;

// GRASP PATTERNS
/* 
    1. controller
    2. high cohesion
*/