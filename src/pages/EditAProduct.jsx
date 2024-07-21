import { useState, useEffect } from "react";
import FetchRequest from "../assets/js/request/fetch";
import { useNavigate, useParams } from "react-router-dom";
import App from "../assets/js/app";

function SellAProduct() {
    const { name, productId } = useParams();

    const [ productName, setProductName ]         = useState("");
    const [ productPrice, setProductPrice ]       = useState(0);
    const [ productDetails, setProductDetails ]   = useState("");
    const [ productQuantity, setProductQuantity ] = useState(1);
    const [ productCategory, setProductCategory ] = useState("");
    const [ categories, setCategories ] = useState([]);

    const [ error, setError ] = useState("");

    const [ productPictureFiles, setProductPictureFiles ] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // get the list of categories
        getCategories();
        getProductDetails();
    }, []); // Empty dependency array ensures it runs only once on mount

    const getProductDetails = () => {
        const success = (data) => {
            const setProduct = (product) => {
                setProductDetails(product.details);
                setProductName(product.name);
                setProductPrice(product.price);
                setProductQuantity(product.available_quantity);
                setProductCategory(product.category);
                setProductPictureFiles(product.images);
            }

            setProduct(data);
        }

        const failure = (data) => {
            console.log(data);
        }

        (new FetchRequest("GET", `user-products/find/${productId}`)).send(success, failure);
    }

    const submitProductDetails = (e) => {
        e.preventDefault();

        if(productPictureFiles.length===0){
            setError("You must select at least one image for your product.");
            return;
        }

        const success = (data) => {
            uploadImages(productId, e, data);
            setError("");
        }

        const failure = (data) => {
            setError(data);
            App.showAlert(false, data);
        }

        const data = {name: productName, price: productPrice, quantity: productQuantity, details: productDetails, category: productCategory};
        (new FetchRequest("PUT", `user-products/${productId}`, data)).send(success, failure);
    }

    const uploadImages = (productId, e, message) => {
        const success = (data) => {
            e.preventDefault();
            const reloadPage = () => {
                navigate("/");
                setTimeout(() => {
                    navigate("");
                }, 0);
            }
            
            reloadPage();
            setError("");
            App.showAlert(true, message);
        }

        const failure = (data) => {
            setError(data);
        }

        const data = getProductImages();
        (new FetchRequest("POST", `product-images/${productId}`, data, true)).send(success, failure);
    }

    const getCategories = () => {
        const success = (data) => {
            setCategories(data);
        }

        const failure = (data) => {
            setCategories(data);
        }

        (new FetchRequest("GET", "categories")).send(success, failure);
    }

    const getProductImages = () => {
        let formData = new FormData();

        productPictureFiles.forEach(file => {
            if(file.id===undefined){
                formData.append('pictures', file);
            }
        });

        return formData;
    }

    const updateSelectedPictures = (target) => {
        const files = Array.from(target.files).slice(0, (6 - productPictureFiles.length));

        setProductPictureFiles((prevFiles) => [...prevFiles, ...files]);
    }

    const dropPicture = (index) => {
        const selectedImage = productPictureFiles[index];

        // if image exists in db, remove the image from db
        if(selectedImage.id!==undefined){
            deletePicture(selectedImage, index);
            return;
        }

        filterPictures(index);
    }

    const filterPictures = (index) => {
        setProductPictureFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

        App.showAlert(true, "Picture was successfully deleted!");
    }

    const deletePicture = (selectedImage, index) => {
        const success = (data) => {
            console.log(data);
            filterPictures(index);
        }

        const failure = (data) => {
            console.log(data);
        }

        const productImageId = selectedImage.id;
        (new FetchRequest("DELETE", `product-images/${productImageId}`)).send(success, failure);
    }

    return (
        <>
            <div>
                <div className="mb-3">
                    <h4>Edit your Product</h4>
                    <hr />
                </div>
                <form onSubmit={submitProductDetails}>
                    <div><p className="text-danger">{ error }</p></div>
                    {/* product name */}
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="name" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="name" required />
                        <label htmlFor="name">Product Name</label>
                    </div>

                    {/* product price */}
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="price" required />
                        <label htmlFor="price">Product Price</label>
                    </div>

                    {/* product quantity */}
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="quantity" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} placeholder="quantity" />
                        <label htmlFor="quantity">Available Quantity</label>
                    </div>

                    {/* product description */}
                    <div className="form-floating mb-3">
                        <textarea className="form-control" id="description" value={productDetails} onChange={(e) => setProductDetails(e.target.value)} placeholder="product details" required></textarea>
                        <label htmlFor="description">Product Description</label>
                    </div>
                    
                    {/* product category */}
                    <div className="form-floating mb-3">
                        <select id="category" className="form-select" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} required>
                            <option value={""}>Select a category</option>
                            {
                                categories.map((category, i) => {
                                    return (
                                        <option key={ i } value={ category._id }>{ category.name }</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor="category">Product Category</label>
                    </div>
                    
                    {/* product images */}
                    <div>
                        
                        <div className="mb-3">
                            <div className="input-group mt-2">
                                <label className="input-group-text fw-bold" htmlFor="displayPic">Upload product Image(s)</label>
                                <input type="file" className="form-control"  max="6" placeholder="select product picture(s)" onChange={(e) => updateSelectedPictures(e.target)} accept="image/*" multiple disabled={productPictureFiles.length > 5} />
                            </div>
                        </div>
                        <div className="mt-3 container-fluid p-0">
                            <div className="mb-2 fw-bold">{productPictureFiles.length} / 6 images selected</div>
                            <div className="row">
                                {
                                    productPictureFiles.map((file, i) => {
                                        return (
                                            <div key={ i } className="col-12 col-sm-4 mb-2">
                                                <div className="position-relative">
                                                    <img src={ (file.id!==undefined ? `/imgs/products/${file.image}` : URL.createObjectURL(file)) } alt={file.name} className="img-fluid w-100" style={{"height": "200px"}} />
                                                    <div className="position-absolute top-0 end-0">
                                                        <button className="btn btn-secondary p-1 rounded-0" type="button" onClick={() => dropPicture(i)}>Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 text-end">
                        <button type="submit" className="btn btn-dark">Update your product</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SellAProduct;