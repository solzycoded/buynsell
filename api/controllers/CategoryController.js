import CategoryService from "../services/CategoryService.js";

const allCategories = async(req, res)  => {
    try {
        // else, create the new user and return their token
        const categories = await CategoryService.listAllCategories();

        res.status(201).json({ success: true, data: categories });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

// export CONTROLLER
const CategoryController = {
    allCategories
}

export default CategoryController;

// GRASP PATTERNS
/* 
    1. controller
    2. high cohesion
*/