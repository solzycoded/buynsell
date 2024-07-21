import { useEffect, useState } from "react";
import FetchRequest from "../../assets/js/request/fetch";
import ProductRow from "../../components/Admin/Products/Item";

const Products = () => {
    const [products, setProducts]                 = useState([]);
    const [searchQuery, setSearchQuery]           = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedStatus, setSelectedStatus]     = useState("");
    const [statusList, setStatusList] = useState([]);

    useEffect(() => {
        listOfProducts();
        getCategories();
        getStatusList();
    }, []);

    const success = (data) => {
        setProducts(data);
    }

    const failure = (data) => {
        console.log(data);
    }

    const listOfProducts = async () => {
        await (new FetchRequest("GET", "products/for-admin")).send(success, failure);
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

    const getStatusList = () => {
        const success = (data) => {
            setStatusList(data);
        }

        const failure = (data) => {
            setStatusList(data);
        }

        (new FetchRequest("GET", "status")).send(success, failure);
    }

    const filterProducts = async () => {
        const data = {search: searchQuery, category: selectedCategory, status: selectedStatus};
        await (new FetchRequest("POST", "products/for-admin", data)).send(success, failure);
    }

    return (
        <>

            <section id="main-section">
                <div className="mb-5 mt-3" id="auction-list">
                    <div className="mb-3">
                        <h4>List of Products</h4>
                    </div>
                    <hr />
                    <div>
                        <div className="mb-3">
                            <div className="mb-3 w-100">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text rounded-end-0"><i className="bi bi-search"></i></span>
                                    </div>
                                    <input type="search" className="form-control" placeholder="Search for a product" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyUp={filterProducts} />
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="form-floating">
                                    <select className="form-select form-select-md" id="select-a-category" aria-label="select a category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} onClick={filterProducts}>
                                        <option value="">all categories</option>
                                        {
                                            categories.map((category, i) => {
                                                return <option key={ i } value={ category._id }>{ category.name }</option>
                                            })
                                        }
                                    </select>
                                    <label htmlFor="select-a-category">Select a Category</label>
                                </div>
                                <div className="form-floating">
                                    <select className="form-select form-select-md" id="select-a-status" aria-label="select a status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} onClick={filterProducts}>
                                        <option value="">all</option>
                                        {
                                            statusList.map((status, i) => {
                                                return <option key={ i } value={ status._id }>{ status.name }</option>
                                            })
                                        }
                                    </select>
                                    <label htmlFor="select-a-status">Select a status</label>
                                </div>
                            </div>
                        </div>

                        <div id="auction-list-container">
                            <table className="table table-hover">
                                <thead className="sticky-top">
                                    <tr>
                                        <th className="fw-bold" scope="col">#</th>
                                        <th className="fw-bold" scope="col">Picture</th>
                                        <th className="fw-bold" scope="col">Name</th>
                                        <th className="fw-bold" scope="col">Price</th>
                                        <th className="fw-bold" scope="col">Category</th>
                                        <th className="fw-bold" scope="col">Details</th>
                                        <th className="fw-bold" scope="col">Available Quantity</th>
                                        <th className="fw-bold" scope="col">Date Created</th>
                                        <th className="fw-bold" scope="col">Status</th>
                                        <th className="fw-bold" scope="col">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        products.map((product, i) => {
                                            return (
                                                <ProductRow product={ product } index={ (i) } key={ i } />
                                            )
                                        })
                                    }
                                    {
                                        (products.length===0) && <tr><td colSpan="10" className="text-center fs-5 text-secondary">Nothing to see here. Try again.</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Products;