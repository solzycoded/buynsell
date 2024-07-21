import { useEffect, useState } from "react";
import ProductItem from "./Item";

import FetchRequest from "../../assets/js/request/fetch.js";

// { products }

function ProductItemGrid() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    // TO BE REMOVED LATER
    const getProducts = () => {
        const success = (data) => {
            setProducts(data);
        }

        const failure = (data) => {
            console.log(data);
        }

        (new FetchRequest("GET", "products")).send(success, failure);
    }

    return products && (
        <div className="container-fluid p-0">
            <div className="row">
                {
                    products.map((product, i) => {
                        return (
                            <ProductItem key={ i } product={ product } />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ProductItemGrid;