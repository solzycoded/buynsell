const ProductImageCarouselItem = ({ image, index }) => {
    return (
        <>
            <div className={`carousel-item ${(index===0 ? "active" : "")}`}>
                <img src={ image } className="d-block w-100 h-100 rounded" alt="product info" />
            </div>
        </>
    )
}

export default ProductImageCarouselItem;