import ProductStatus from "../models/ProductStatus.js";
import StatusService from "./StatusService.js";

const ProductStatusService = (() => {
    const findByProductId = async (productId) => {
        const productStatus = await ProductStatus.findOne({ product: productId }).exec();

        return productStatus;
    }

    const updateProductStatus = async (productStatus) => {
        const data = { status: productStatus.status, product: productStatus.product, reason: productStatus.reason, updated_at: Date.now() };

        await ProductStatus.findByIdAndUpdate(productStatus.id, data, { new: true }).exec();
    }

    const findStatusId = async (statusCommand = "") => {
        // approve, reject, disable or under review
        let statusName = "under review";

        if(statusCommand==="approve") {
            statusName = "approved";
        }
        else if(statusCommand==="reject") {
            statusName = "rejected";
        }
        else if(statusCommand==="disable") {
            statusName = "disabled";
        }

        const status = await StatusService.findStatusByName(statusName);

        return status._id;
    }

    const createProductStatus = async (productStatus) => {
        const productStatusModel = new ProductStatus(productStatus);

        productStatus = productStatusModel.save();
    }

    return {
        findByProductId,
        updateProductStatus,
        createProductStatus,
        findStatusId,
    }

})();

export default ProductStatusService;

// GRASP PATTERNS
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
*/