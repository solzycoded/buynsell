import { useEffect, useState } from "react";
import FetchRequest from "../../../assets/js/request/fetch";

const DeliveryDetails = () => {
    const [ postCode, setPostCode ] = useState("");
    const [ city, setCity ]         = useState("");
    const [ country, setCountry ]   = useState("");
    const [ address, setAddress ]   = useState("");

    const [ deliveryAddresses, setDeliveryAddresses ] = useState([]);
    const [ showNewAddressField, setShowNewAddressField ] = useState(false);

    useEffect(() => {
        getCustomerAddressList();
    }, []);

    const confirmPostCode = async (postCode) => {
        try {
            postCode = postCode.trim();

            const response = await fetch(`https://api.postcodes.io/postcodes/${postCode}`); // Adjust the limit as needed
            const data     = await response.json();

            if(data.status===200){
                let result = data.result;

                setCity(result.admin_district);
                setCountry(result.country);
            }
            else{
                setCity("");
                setCountry("");
            }
        } catch (error) {
            // console.error('Error fetching cities:', error);
        }
    };

    const getCustomerAddressList = () => {
        const success = (data) => {
            setDeliveryAddresses(data);
        }

        const failure = (data) => {
            console.log(data);
        }

        (new FetchRequest("GET", "addresses")).send(success, failure);
    };

    const removeAddress = (addressId, index) => {
        const success = (data) => {
            filterAddress(index);
        }

        const failure = (data) => {
            console.log(data);
        }

        (new FetchRequest("DELETE", `addresses/${addressId}`)).send(success, failure);
    };

    const filterAddress = (index) => {
        const newAddressList = deliveryAddresses.filter((_, i) => i !== index);
        setDeliveryAddresses(newAddressList);
    }

    const submitDeliveryAddressDetails = (e) => {
        e.preventDefault();

        const success = (data) => {
            getCustomerAddressList();
        }

        const failure = (data) => {
            console.log(data);
        }

        const data = { countryName: country, cityName: city, postCodeName: postCode, userAddress: address };
        (new FetchRequest("POST", "addresses", data)).send(success, failure);
    };

    const toggleAddressField = () => {
        setShowNewAddressField(!showNewAddressField);
    }

    return (
        <>
            <div>
                <h5>Select Delivery Option</h5>
                {/* delivery options */}
                <div className="mb-3">
                    <div className="form-check">
                        <input className="form-check-input" 
                            type="radio" 
                            name="delivery_option" 
                            id="delivery-address"
                            value="delivery address" required defaultChecked /> 
                        <label className="form-check-label" htmlFor="delivery-address">
                            Delivery Address
                        </label>
                    </div>
                    <div className="container-fluid mt-3 ps-3 pe-3">
                        {/* create a new delivery address */}
                        <form onSubmit={submitDeliveryAddressDetails}>
                            <div>
                                <h6 className="cursor-pointer" onClick={toggleAddressField}>Add a new address <i className={`bi bi-chevron-${(showNewAddressField ? "right" : "down")} ms-2`}></i></h6>
                            </div>
                            <div className={`mb-3 ${(showNewAddressField ? "" : "d-none")}`}>
                                <div className="mb-2">
                                    <input type="text" className="form-control" placeholder="Enter the post code" name="post_code" required value={postCode} onChange={(e) => setPostCode(e.target.value)} onKeyUp={() => confirmPostCode(postCode)} />
                                </div>
                                <div className="input-group mb-2">
                                    <input type="text" className="form-control disabled" placeholder="City" name="city" required readOnly value={city} />
                                    <input type="text" className="form-control disabled" placeholder="Country" name="country" required readOnly value={country} />
                                </div>
                                <div className={`input-group ${(country==="" ? "d-none" : "")}`}>
                                    <input type="text" className="form-control" placeholder="Enter the address" name="address" required value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className={`text-end mt-3 ${(country==="" ? "d-none" : "")}`}>
                                    <button className="btn btn-outline-dark" type="submit" id="new-delivery-address">Add <i className="bi bi-plus"></i></button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-4">
                            <h6>Select an address</h6>
                            <div>
                                {
                                    deliveryAddresses.map((deliveryAddress, i) => {
                                        let postCode = deliveryAddress.post_code;
                                        let city     = deliveryAddress.post_code.city;
                                    
                                        return (
                                            <div key={ i } className="d-flex justify-content-start">
                                                <div className="form-check">
                                                    <input className="form-check-input" 
                                                        type="radio" 
                                                        name="delivery_address" 
                                                        id={`delivery-address-${i}`} 
                                                        value={deliveryAddress.id} required />
                                                    <label className="form-check-label" htmlFor="delivery-address">
                                                        {`${deliveryAddress.address}, ${postCode.code}, ${city.name}, ${city.country.name}`}
                                                    </label>
                                                </div>

                                                <div className="ms-5">
                                                    <button type="button" className="btn btn-transparent border-0 text-danger p-0" onClick={() => removeAddress(deliveryAddress.id, i)}><i className="bi bi-trash"></i></button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    (deliveryAddresses.length===0) && (
                                        <div className="text-muted">There's no address for you to select from yet. Kindly add one, above.</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* pickup */}
                {/* <div>
                    <div className="form-check">
                        <input className="form-check-input" 
                            type="radio" 
                            name="delivery_option" 
                            id="pick-up"
                            value="pick up"
                            onChange={(e) => handleSelectedDeliveryOption(e.target.value)}
                             />
                        <label className="form-check-label" htmlFor="pick-up">
                            Pick up
                        </label>
                    </div>
                    
                    <div className={`container-fluid mt-3 d-none`}>
                        <h6>Available pick up locations</h6>
                        <div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="pick_up_option" id="pick-up-option1" />
                                <label className="form-check-label" htmlFor="pick-up-option1">
                                    The hub, coventry
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="pick_up_option" id="pick-up-option2" />
                                <label className="form-check-label" htmlFor="pick-up-option2">
                                    Pool Meadow Bus Station, Coventry, England
                                </label>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default DeliveryDetails;