import PostCode from "../models/PostCode.js";

const PostCodeService = (() => {
    const listAllPostCodes = async () => {
        const postCodes = await PostCode.find().exec();

        return postCodes;
    }

    const createNewPostCode = async (city, postCodeName) => { // create a new postCode, only if it does not exist and return the postCode's document
        let postCode = await findPostCodeByName(city, postCodeName);

        if(!postCode){
            postCode = new PostCode({ code: postCodeName, city });

            postCode.save();
        }

        return postCode._id;
    }

    const findPostCodeByName = async (city, postCodeName) => {
        return await PostCode.findOne({ code: postCodeName, city }).exec();
    }

    return {
        listAllPostCodes,
        createNewPostCode,
    }

})();
export default PostCodeService;

// GRASP PATTERNS
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
    4. indirection??
*/