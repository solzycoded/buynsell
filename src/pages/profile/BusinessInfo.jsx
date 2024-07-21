import { useEffect, useState } from "react";
import { useAuth } from "../../components/Auth/AuthContext";
import FetchRequest from "../../assets/js/request/fetch";
import App from "../../assets/js/app";

const BusinessInfo = () => {
    const { user, loading } = useAuth();
    const [ profile, setProfile ] = useState(null);
    const [ email, setEmail ]     = useState("");
    const [ name, setName ]       = useState("");
    const [ businessName, setBusinessName ]       = useState("");
    const [ startedOn, setStartedOn ]       = useState(2024);
    const [ businessAddress, setBusinessAddress ]       = useState("");
    const [ displayPic, setDisplayPic ]       = useState(null);
    const [ tempService, setTempService ]       = useState("");
    const [ services, setServices ]       = useState([]);

    const [ allowEdit, setAllowEdit ]     = useState(false);
    const [ password, setPassword ] = useState("");
    const [ passwordErr, setPasswordErr ] = useState("");

    useEffect(() => {
        getUserProfileDetails();
        if(user){
            setEmail(user.email);
            setName(user.name);
        }
    }, [user]);

    const getUserProfileDetails = () => {
        const success = (data) => {
            setProfile(data);
            // it splits a string in this format, "something, another thing, something else, nothing" to this [...]
            const setProfileValue = () => {
                const configureBusinessServices = () => {
                    let altServices = data.services;
                    if(altServices.length > 0){
                        altServices = altServices.split(",");
                        setServices(altServices);
                    }
                }

                configureBusinessServices();
                setBusinessName(data.business_name);
                setStartedOn(data.started_on);
                setBusinessAddress(data.address);
            }

            setProfileValue();
        }

        const failure = (data) => {
            setProfile(null);
        }

        (new FetchRequest("GET", `profile`)).send(success, failure);
    }

    if(!loading && !user){ // if user isn't logged in, stop the html doc from rendering
        return;
    }

    const updateSelectedPicture = (target) => {
        const file = target.files[0]
        setDisplayPic(file);
    }

    const updateBusinessServices = (e) => {
        if(e.keyCode===13){
            const service = e.target.value;

            // function to check if service already exists in the services array
            const checkService = (target) => {
                return target.toLowerCase()===service.toLowerCase();
            }

            const serviceExists = services.find(checkService);

            if(serviceExists===undefined){
                setServices((prevServices) => [...prevServices, service]);
            }

            setTempService("");
        }
    }

    const removeService = (index) => {
        if(allowEdit){
            setServices((prevServices) => prevServices.filter((_, i) => i !== index));
        }
    }

    const confirmPassword = (e) => {
        e.preventDefault();

        const success = (data) => {
            // allow user to edit their business details
            setAllowEdit(true);
            // set the password error to ""
            setPasswordErr("");
            // close confirm password modal
            document.querySelector(".btn-close").click();

            App.showAlert(true, data);
        }

        const failure = (data) => {
            setPasswordErr(data.message);
            App.showAlert(false, data.message);
        }

        (new FetchRequest("POST", "profile/confirm-password", { password })).send(success, failure);
    }

    const updateBusinessInfo = (e) => {
        e.preventDefault();

        const success = (data) => {
            App.showAlert(true, data);
        }

        const failure = (data) => {
            App.showAlert(false, data);
        }

        const data = new FormData();

        data.append("email", email);
        data.append("name", name);
        data.append("businessName", businessName);
        data.append("businessAddress", businessAddress); 
        data.append("startedOn", startedOn);
        data.append("displayPic", displayPic);
        data.append("services", services);

        (new FetchRequest("POST", "profile", data, true)).send(success, failure);
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h5>
                        Business Info 
                        {
                            !allowEdit && (<button className="btn btn-secondary p-1 ms-2" data-bs-toggle="modal" data-bs-target="#verifyPasswordModal">Edit <i className="bi bi-pencil"></i></button>)
                        }
                    </h5>
                    <hr />
                </div>

                {/* <form className="container-fluid"> */}
                    <div className="row">
                        <div className="col-12 col-md-6 mb-4">
                            {/* email address */}
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="email" placeholder="name@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!allowEdit} />
                                <label htmlFor="email">Email Address</label>
                            </div>

                            {/* name */}
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="username" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!allowEdit} />
                                <label htmlFor="username">Username</label>
                            </div>

                            {/* business name */}
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="businessName" placeholder="business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} disabled={!allowEdit} />
                                <label htmlFor="businessName">Business Name</label>
                            </div>

                            {/* started on */}
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" min="1900" max="2024" step="1" id="startedOn" placeholder="started on" value={startedOn} onChange={(e) => setStartedOn(e.target.value)} disabled={!allowEdit} />
                                <label htmlFor="startedOn">Year Started</label>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">

                            {/* business address */}
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="address" placeholder="address" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} disabled={!allowEdit} />
                                <label htmlFor="address">Business Address</label>
                            </div>

                            {/* display picture */}
                            <div className="mb-3">
                                <div className="input-group">
                                    <label className="input-group-text" htmlFor="displayPic">Upload</label>
                                    <input type="file" className="form-control" placeholder="select product picture(s)" onChange={(e) => updateSelectedPicture(e.target)} accept="image/*" disabled={!allowEdit} />
                                </div>
                                {
                                    displayPic && (
                                        <div className="mt-2">
                                            <img src={ URL.createObjectURL(displayPic) } alt={displayPic.name} className="img-fluid" />
                                            <button type="button" onClick={() => setDisplayPic(null)} disabled={!allowEdit}>Remove</button>
                                        </div>
                                    )
                                }
                            </div>

                            {/* services */}
                            <div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="service" placeholder="service" value={tempService} onChange={(e) => setTempService(e.target.value)} onKeyUp={updateBusinessServices} disabled={!allowEdit} />
                                    <label htmlFor="service">Service</label>
                                </div>
                                <div className="mt-2 d-flex justify-content-start">
                                    {
                                        services.map((service, i) => {
                                            return (
                                                <div key={ i } className="me-2 cursor-pointer" onClick={() => removeService(i)}>{ service } <i className="bi bi-x ms-1"></i></div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-12 text-end mt-3">
                            <button type="button" className="btn btn-dark" disabled={!allowEdit} onClick={updateBusinessInfo}>Update</button>
                        </div>
                    </div>
                {/* </form> */}
            </div>

            {/* confirm password modal */}
            <div className="modal fade" id="verifyPasswordModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="verifyPasswordModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="verifyPasswordModalLabel">Verify Password</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={confirmPassword}>
                        <div className="modal-body">
                            <p className="text-danger">{ passwordErr }</p>
                            {/* password */}
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={allowEdit} required />
                                <label htmlFor="password">What's your password?</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Check Password</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BusinessInfo;