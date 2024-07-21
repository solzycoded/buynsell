import ProductStatusItem from "./Item";

const ProductStatus = ({ productId, status }) => {
    return (
        <>
            <div>
                <ProductStatusItem productId={productId} status={status} title="approve" color="success" />
                <ProductStatusItem productId={productId} status={status} title="reject" color="danger" />
                <ProductStatusItem productId={productId} status={status} title="disable" color="secondary" />
            </div>
        </>
    )
}

export default ProductStatus;