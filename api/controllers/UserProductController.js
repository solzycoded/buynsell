import ProductService from "../services/ProductService.js";
import ProductStatusService from "../services/ProductStatusService.js";
import UserProductService from "../services/UserProductService.js";

const index = async(req, res)  => {
    try {
        let { limit } = req.params;
        if(!limit){ // set limit variable to 0, if it wasn't passed as a parameter
            limit = 0;
        }

        const userId   = req.session.user.id;
        const products = await UserProductService.listOfProducts(userId, limit);

        res.status(201).json({ success: (products.length > 0), data: products });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const deleteProduct = async(req, res) => {
    const { productId } = req.body;

    if(!productId) {
        res.status(500).json({ success: false, data: "ProductId is missing!" });
        return;
    }

    try {
        // check IF product exists and it belongs to the logged in user
        const user           = req.session.user.id;
        const productIsValid = await UserProductService.validateProduct(productId, user);
        
        if(!productIsValid){
            res.status(202).json({ success: false, data: "Product does not exist or this product isn't yours to delete." });
            return;
        }

        // IF product is valid, proceed with deleting, but not before checking if there's a pending order
        const productHasPendingOrder = await UserProductService.productHasPendingOrder(productId);

        if(productHasPendingOrder){
            res.status(201).json({ success: false, data: "This product has pending orders, attached to it. You cannot delete it!" });
            return;
        }

        UserProductService.deleteProduct(productId);

        res.status(201).json({ success: true, data: "The selected product has been deleted successfully!" });
        return;
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const find = async(req, res) => {
    const { productId } = req.params;

    if(!productId) {
        res.status(403).json({ success: false, data: "ProductId is missing!" });
        return;
    }

    try {
        // check IF product exists and it belongs to the logged in user
        const user           = req.session.user.id;
        const productIsValid = await UserProductService.validateProduct(productId, user);
        
        if(!productIsValid){
            res.status(202).json({ success: false, data: "Product does not exist or this product isn't yours to delete." });
            return;
        }

        const product = await UserProductService.findProduct(productId, user);

        res.status(201).json({ success: (product && product.id ? true : false), data: product });

        return;
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const update = async(req, res)  => {
    const { name, quantity, price, details, category } = req.body;
    const { productId } = req.params;

    if(!productId || !name || !price || !category) {
        res.status(400).json({ success: false, data: "Product Id, Name, Price or Category field is missing!" });
        return;
    }

    try {
        const seller          = req.session.user.id;
        
        // check if product exists and if it belongs to the logged in user
        const productIsValid = await UserProductService.validateProduct(productId, seller);
        
        if(!productIsValid){
            res.status(202).json({ success: false, data: "Product does not exist or this product isn't yours to delete." });
            return;
        }

        // check...
        const nameIsDuplicate = await ProductService.nameIsDuplicate(seller, name, productId);

        // if the selected product name, already exists for the user send a 400 response with a message and return
        if(nameIsDuplicate){
            res.status(201).json({ success: false, data: `You already have a product with the name, ${name}!` });
            return;
        }

        // else, update the product
        await UserProductService.updateProduct(name, quantity, price, details, category, productId);

        // update product status
        const status        = await ProductStatusService.findStatusId();
        const productStatus = await ProductStatusService.findByProductId(productId);

        await ProductStatusService.updateProductStatus({ status, product: productId, reason: "You just updated your product. It has to undergo another review, before approval.", id: productStatus._id });

        res.status(201).json({ success: true, data: `Your product ${name}, was successfully updated!` });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

// export CONTROLLER
const UserProductController = {
    index,
    deleteProduct,
    find,
    update,
}

export default UserProductController;

// GRASP PATTERNS
/*
    1. controller
    2. high cohesion
*/