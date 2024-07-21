import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import FetchRequest from "../assets/js/request/fetch.js";
import { useAuth } from "../components/Auth/AuthContext.jsx";

const Login = () => {
    const [email, setEmail]       = useState("something@gmail.com");
    const [password, setPassword] = useState("passworded123");
    const [error, setError]       = useState("");

    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if(!loading && user){
            if(user.role==="customer"){
                navigate("/profile");
            }
            else if(user.role==="admin"){
                navigate("/dashboard");
            }
            return;
        }
    }, [user, loading, navigate]);

    const submitLoginDetails = (e) => {
        e.preventDefault();

        let data = {email, password};

        const success = (data) => {
            setError("");
            window.location.reload(); // remove later, replace with href and re-direct to profile page
            console.log(data); /// remove later, replace with alert
        }

        const failure = (data) => {
            setError(data);
        }

        (new FetchRequest("POST", "login", data)).send(success, failure);
    }

    return (
        <>
            <section className="mt-20">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="login-section">
                        <form onSubmit={submitLoginDetails} autoComplete="off">

                            <div className="text-center mb-20">
                                <h3>Login</h3>
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
                                        Password
                                    </label>
                                    <input className="form-control"
                                        type="password"
                                        name="password"
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="password" required />
                                </div>
                            </div>

                            <div className="text-center">
                                <button type="submit" 
                                    className="btn text-white rounded-pill fw-bold bg-dark fs-5 w-100">
                                    Login
                                </button>

                                <p>Don't have an account yet? <NavLink to="/register" className="text-decoration-none text-primary">Register</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;