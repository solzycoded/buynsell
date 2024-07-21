import { NavLink } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import { useEffect, useState } from "react";
import FetchRequest from "../../../assets/js/request/fetch";

const BusinessInfo = () => {
    const { user } = useAuth();
    const [ profile, setProfile ] = useState(null);

    useEffect(() => {
        getUserProfileDetails();
    }, []);

    const getUserProfileDetails = () => {
        const success = (data) => {
            setProfile(data);
        }

        const failure = (data) => {
            setProfile(null);
        }

        (new FetchRequest("GET", `profile`)).send(success, failure);
    }

    if(!user){ // if user isn't logged in, stop the html doc from rendering
        return;
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h5>Business Info <NavLink className="ms-2 fs-4" to={"business-info"}><i className="bi bi-arrow-right"></i></NavLink></h5>
                    <hr />
                </div>
                <div className="col-12 col-md-6">
                    <p><b>Email Address:</b><span className="ms-2">{ user.email }</span></p>
                </div>
                <div className="col-12 col-md-6">
                    <p><b>Username:</b><span className="ms-2">{ user.name }</span></p>
                </div>
                {
                    profile && (
                        <>
                            <div className="col-12 col-md-6">
                                <p><b>Business Name:</b><span className="ms-2">somebody is coming ltd</span></p>
                            </div>
                            <div className="col-12 col-md-6">
                                <p><b>Business Address:</b><span className="ms-2">somewhere in the uk, sw3 4nw, england</span></p>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default BusinessInfo;