import { useEffect, useState } from "react";
import MySellerOrderItem from "./Item";
import FetchRequest from "../../../../assets/js/request/fetch";
import UpdateSellerOrder from "../../../Orders/UpdateOrder";

function MySellerOrderItemGrid() { 
    const [ orders, setOrders ] = useState([]);

    useEffect(() => {
        getSellerOrders();
    }, []);

    const getSellerOrders = () => {
        const success = (data) => {
            setOrders(data);
        }

        const failure = (data) => {
            setOrders(data);
        }

        (new FetchRequest("GET", `orders/seller`)).send(success, failure);
    }

    return (
        <>
            {
                orders.map((order, i) => {
                    return <MySellerOrderItem key={ i } order={ order } />
                })
            }
            {
                (orders.length===0) && (
                    <div>Customers haven't placed any order yet.</div>
                )
            }

            <UpdateSellerOrder />
        </>
    );
}

export default MySellerOrderItemGrid;