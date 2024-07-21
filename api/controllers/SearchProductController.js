import IndexProductService from "../services/IndexProductService.js";

const index = async(req, res)  => {
    const { searchQuery }     = req.params;

    try {
        const products = await IndexProductService.customerListOfProducts(searchQuery, "approved");

        res.status(201).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

// export CONTROLLER
const SearchProductController = {
    index,
}

export default SearchProductController;

// GRASP PATTERNS
/* 
    1. controller
    2. high cohesion
*/