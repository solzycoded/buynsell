import ProductImageCarouselItem from "./Item";

const ProductImageCarousel = ({ images }) => {
    return (
        <>
            <div id="productImageAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {
                        images.map((image, i) => {
                            return <ProductImageCarouselItem key={ i } image={ `/imgs/products/${image.image}` } index={ i } />
                        })
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#productImageAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#productImageAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default ProductImageCarousel;