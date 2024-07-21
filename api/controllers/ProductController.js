import ProductService from "../services/ProductService.js";
import CreateProductService from "../services/CreateProductService.js";
import IndexProductService from "../services/IndexProductService.js";
import ProductStatusService from "../services/ProductStatusService.js";

const create = async(req, res)  => {
    const { name, quantity, price, details, category } = req.body;

    if(!name || !price || !category) {
        res.status(400).json({ success: false, data: "Name, Price or Category field is missing!" });
        return;
    }

    try {
        const seller          = req.session.user;

        // check...
        const nameIsDuplicate = await ProductService.nameIsDuplicate(seller.id, name);

        // if the selected product name, already exists for the user send a 400 response with a message and return
        if(nameIsDuplicate){
            res.status(201).json({ success: false, data: `You already have a product with the name, ${name}!` });
            return;
        }

        // else, create the new user and return their token
        const product   = await CreateProductService.createProduct({ name, quantity, price, details, category, seller });
        const productId = product._id;

        // create product status
        const status    = await ProductStatusService.findStatusId();

        await ProductStatusService.createProductStatus({ status, product: productId, reason: "" });

        res.status(201).json({ success: true, data: { productId, message: `${name} was successfully created! Kindly wait till it's approved.` } });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const index = async(req, res)  => { // products to be displayed to the customer
    try {
        const products = await IndexProductService.customerListOfProducts("", "approved");

        res.status(201).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const indexAll = async(req, res)  => { // products to be displayed to the admin
    if(req.session.user.role!=="admin"){
        res.status(202).json({ success: false, data: "You're not authorized to perform this action" });
        return;
    }

    const { search, category, status } = req.body;

    try {
        const products = await IndexProductService.adminListOfProducts(search, category, status);

        res.status(201).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const find = async(req, res) => {
    const { productId } = req.params;

    if(!productId){
        res.status(500).json({ success: false, data: "Product Id is missing!" });
        return;
    }

    try {
        // else, create the new user and return their token
        const product = await ProductService.findProduct(productId);

        res.status(201).json({ success: true, data: product });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
}

// export CONTROLLER
const ProductController = {
    indexAll,
    create,
    index,
    find,
}

export default ProductController;

// GRASP PATTERNS
/* 
    1. controller
    2. high cohesion
*/