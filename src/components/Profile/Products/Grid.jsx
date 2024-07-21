import MyProductItem from "./Item";
import { useEffect, useState } from "react";
import FetchRequest from "../../../assets/js/request/fetch";

function MyProductItemGrid() {
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        getUserProducts();
    }, []);

    const getUserProducts = () => {
        const success = (data) => {
            setProducts(data);
        }

        const failure = (data) => {
            setProducts(data);
        }

        (new FetchRequest("GET", `user-products`)).send(success, failure);
    }

    return (
        <>
            {
                products.map((product, i) => {
                    return <MyProductItem key={ i } product={ product } />
                })
            }
            {
                (products.length===0) && (
                    <div>You do not have any products.</div>
                )
            }
        </>
    );
}

export default MyProductItemGrid;