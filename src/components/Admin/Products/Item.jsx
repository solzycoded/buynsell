import ProductStatus from "./Status/Section";

const ProductRow = ({ product, index }) => {
    const statusName = product.product_status[0].status.name;

    const statusOfProduct = () => {
        switch (statusName) {
            case "approved":
                return "success";
            case "rejected":
                return "danger";
            case "disabled":
                return "secondary";
            default:
                return "warning";
        }
    }

    return (
        <>
            <tr>
                <td className="fw-bold">{ (index + 1) }</td>
                <td>
                    <div>
                        
                        <div id={`carouselAdminProduct-${index}`} className="carousel slide">
                            <div className="carousel-inner">
                                {
                                    product.images.map((image, i) => {
                                        return (
                                            <div key={ i } className={ `carousel-item ${(i===0 ? 'active' : '')}` }>
                                                <img 
                                                    src={ ((image!==undefined) ? `/imgs/products/${image.image}` : "") } 
                                                    className="d-block img-fluid w-100" 
                                                    alt="product visual"
                                                    style={{"height": "200px"}} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#carouselAdminProduct-${index}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#carouselAdminProduct-${index}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </td>
                <td>{ product.name }</td>
                <td>{ product.price }</td>
                <td>{ product.category.name }</td>
                <td>{ product.details }</td>
                <td>{ product.available_quantity }</td>
                <td>{ product.created_at }</td>
                <td className={ `bg-${statusOfProduct()} fw-bold text-white current-product-status` }>{ statusName }</td>
                <td>
                {/* include product.status.name later */}
                    <ProductStatus productId={product.id} status="replace me later" />
                </td>
            </tr>
        </>
    )
}

export default ProductRow;