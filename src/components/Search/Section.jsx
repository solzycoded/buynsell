import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../../assets/css/search.css"
import FetchRequest from "../../assets/js/request/fetch";

const Search = () => {
    const [showSearch, setShowSearch]               = useState("");
    const [showSearchResults, setShowSearchResults] = useState("");
    const [searchQuery, setSearchQuery]             = useState("");
    const [products, updateProducts]                    = useState([]);

    const navigate = useNavigate();

    // const toggleSearch = () => {
    //     let searchValue = (showSearch=="active" ? "" : "active");

    //     setShowSearch(searchValue);
    //     if(searchValue==""){
    //         setShowSearchResults(searchValue);
    //     }
    // }

    const toggleSearchResultsDropdown = () => {
        setShowSearchResults((showSearchResults==="active" ? "" : "active"));
    }

    const filterSearchResults = () => {
        const success = (data) => {
            updateProducts(data);
        }

        const failure = (data) => {
            console.log(data);
        }

        (new FetchRequest("GET", `products/search/${searchQuery}`)).send(success, failure);
    }

    const goToProduct = (location) => {
        navigate('/');
        setTimeout(() => {
          navigate(location);
        }, 0);
    }

    return (
        <>
            <div className="d-flex" role="search">
                <div className="position-relative search-container">
                    <div className="input-group mb-1 search-bar">
                        <div className={ `search-bar-section ${showSearch}` }>
                            <input className="form-control rounded-0"
                                type="search" 
                                placeholder="find a product" 
                                aria-label="Search" 
                                id="search-for-item" 
                                onClick={ toggleSearchResultsDropdown } 
                                autoComplete="off" 
                                onKeyUp={ filterSearchResults }
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        {/* icon */}
                        {/* <div className="p-0"> 
                            <button className="p-0 btn btn-dark text-white fs-3" 
                                onClick={ toggleSearch }>
                                <i className={ `p-0 bi bi-${(showSearch=="active" ? "x" : "search")}`}></i>
                            </button>
                        </div> */}
                    </div>

                    <div className={ `position-absolute top-75 w-100 search-results-dropdown ${showSearchResults}` } id="search-results-dropdown">
                        <div className="list-group search-results-dropdown-section">
                            {
                                products.map((product, i) => {
                                    return (
                                        <div key={ i } 
                                            className="list-group-item list-group-item-action d-flex justify-content-start cursor-pointer"
                                            onClick={() => goToProduct(`products/${product._id}/${product.name}`)}>
                                            <div>
                                                <img src={ (product.images[0]!==undefined ? `/imgs/products/${product.images[0].image}` : "https://res.cloudinary.com/ellegacy/image/upload/v1716228810/lelskznm8pilgc53xcdd.jpg") } className="img-fluid" width="40" alt="product visual" />
                                            </div>
                                            <div className="ms-2">
                                                <p className="m-0 text-capitalize"><small>{ product.name }</small></p>
                                                <p className="m-0 text-secondary fw-lighter"><small>{ product.available_quantity } left</small></p>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <p className={ `list-group-item disabled ${(products.length > 0 ? "d-none" : "")}` }>No results found</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search;