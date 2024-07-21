import Category from "../models/Category.js";
import data from "../util/data.js";

const CategoryService = (() => {
    const listAllCategories = async () => {
        const categories = await Category.find().exec();

        return categories;
    }

    /* create default list of categories */
    const createDefaultCategories = async () => {
        Category.insertMany(data.categories)
            .then((docs) => {
                console.log('Multiple categories inserted');
            })
            .catch((err) => {
                // console.error('Error inserting records: ', err);
            });
    }
    createDefaultCategories();

    return {
        listAllCategories,
    }
})();

export default CategoryService;

// GRASP PATTERNS
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
    4. indirection??
*/