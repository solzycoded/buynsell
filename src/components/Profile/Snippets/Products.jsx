import MyProductItemGrid from "../Products/Grid";

const MyProducts = () => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h5>My Products</h5>
                    <hr />
                </div>
                <MyProductItemGrid />
            </div>
        </>
    )
}

export default MyProducts;