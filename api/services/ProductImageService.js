import ProductImage from "../models/ProductImage.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const ProductImageService = (() => {
    const storeProductImage = async (productId, images, res) => {
        const data = createProductImageUrls(productId, images);

        ProductImage.insertMany(data)
            .then((docs) => {
                res.status(201).json({ success: true });
            })
            .catch((err) => {
                console.error('Error inserting records: ', err);
                res.status(500).json({ success: false, data: err });
            });
    }

    const createProductImageUrls = (productId, images) => {
        let productImageUrls = [];

        images.forEach(image => {
            productImageUrls.push({product: productId, image: image.filename});
        });

        return productImageUrls;
    }

    const createMulterStorage = (destFolder = "products") => {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
            cb(null, `public/imgs/${destFolder}/`);
            },
            filename: function (req, file, cb) {
            cb(null, file.originalname);
            }
        });

        // Define limits for uploaded files
        const limits = {
            fileSize: 10 * 1024 * 1024, // 10 MB (adjust this value according to your needs)
        };
        const upload = multer({ storage, limits });

        return upload;
    }

    const findImageById = async (id) => {
        return await ProductImage.findOne({ _id: id }).exec();
    }

    const deleteProductImage = async (productImageId, res) => {
        const image = await findImageById(productImageId);
        const imagePath = path.join(path.basename("/"), 'public', 'imgs/products', image.image); // get full file path

        // remove the image from the public folder
        unlinkImage(imagePath, productImageId, res);
    }

    const unlinkImage = (imagePath, productImageId, res) => {
        fs.unlink(imagePath, (err) => {
            if(err){
                return res.status(500).send({ success: false, data: 'An error occurred while deleting the image' });
            }
            const deleteImageFromDb = async () => {
                await ProductImage.deleteOne({ _id: productImageId });

                res.status(201).send({ success: true, data: "Product Image was successfully deleted" });
                return;
            }

            deleteImageFromDb();
            return;
        })
    }

    return {
        storeProductImage,
        createMulterStorage,
        deleteProductImage,
    }

})();

export default ProductImageService;

// GRASP PATTERNS
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
    4. indirection
*/