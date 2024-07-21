import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import FetchRequest from "../assets/js/request/fetch.js";

const Register = () => {
    const [email, setEmail]                 = useState("soal@gmail.com");
    const [name, setName]                   = useState("namaeless");
    const [password, setPassword]           = useState("nameless");
    const [rePassword, setRePassword]       = useState("nameless");
    const [passwordErr, setPasswordErr]     = useState("");
    const [rePasswordErr, setRePasswordErr] = useState("");
    const [error, setError]                 = useState("");

    const navigate                          = useNavigate();

    const checkPassword = (targetValue) => {
        setPassword(targetValue);

        if(password==rePassword){
            setPasswordErr("");
        }
        else if (rePassword.trim()!==""){
            setPasswordErr("Password and Re-Password are not the same!");
        }
    }

    const checkRePassword = (targetValue) => {
        setRePassword(targetValue);

        if(password.trim()==rePassword.trim()){
            setRePasswordErr("");
        }
        else{
            setRePasswordErr("Password and Re-Password are not the same!");
        }
    }

    const submitRegistrationDetails = (e) => {
        e.preventDefault();

        let data = {name, email, password};

        const success = (data) => {
            setError("");

            alert("success");

            navigate("/login"); // remove this later and replace with an a redirect to an OTP page
        }

        const failure = (data) => {
            setError(data);
        }

        (new FetchRequest("POST", "register", data)).send(success, failure);
    }

    return (
        <>
            <section className="mt-20">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="register-section">
                        <form onSubmit={submitRegistrationDetails} autoComplete="off">

                            <div className="text-center mb-20">
                                <h3>Register</h3>
                                <div className="text-danger text-small">{error}</div>
                            </div>

                            <div>
                                <div className="text-danger mb-2 text-center"></div>
                                <div className="mb-3">
                                    <label 
                                        className="form-label text-capitalize fw-bold" 
                                        htmlFor="email">
                                        Email Address
                                    </label>
                                    <input className="form-control"
                                        type="email"
                                        name="email"
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="email" required />
                                </div>

                                <div className="mb-3">
                                    <label 
                                        className="form-label text-capitalize fw-bold" 
                                        htmlFor="username">
                                        Username
                                    </label>
                                    <input className="form-control"
                                        type="text"
                                        name="name"
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                        id="username" required />
                                </div>

                                <div className="mb-3">
                                    <label 
                                        className="form-label text-capitalize fw-bold" 
                                        htmlFor="username">
                                        Password
                                    </label>
                                    <input className="form-control"
                                        type="password"
                                        name="password"
                                        value={password} 
                                        onChange={(e) => checkPassword(e.target.value)}
                                        id="password" required />
                                    <div className="text-danger text-small fw-bold">{passwordErr}</div>
                                </div>

                                <div className="mb-3">
                                    <label 
                                        className="form-label text-capitalize fw-bold" 
                                        htmlFor="username">
                                        Re-Password
                                    </label>
                                    <input className="form-control"
                                        type="password"
                                        name="re_password"
                                        value={rePassword} 
                                        onChange={(e) => checkRePassword(e.target.value)}
                                        id="re-password" required />
                                    <div className="text-danger text-small fw-bold">{rePasswordErr}</div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button type="submit" 
                                    className="btn text-white rounded-pill fw-bold bg-dark fs-5 w-100">
                                    Register
                                </button>

                                <p>Already have an account? <NavLink to="/login" className="text-decoration-none text-primary">Login</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register;