import App from "../../assets/js/app";
import FetchRequest from "../../assets/js/request/fetch";

const Logout = () => {
    const logout = (e) => {
        e.preventDefault();
        
        const success = (data) => {
            App.showAlert(true, "You have successfully Logged out!");
            setTimeout(() => {
                window.location.href = "/";
            }, 4000);
        }

        const failure = (data) => {
            App.showAlert(false, data);
        }

        (new FetchRequest("POST", "session/log-out")).send(success, failure);
    }

    return (
        <>
            <li className="nav-item">
                <form onSubmit={logout}>
                    <button type="submit" className="btn text-white pt-2"><i className="bi bi-box-arrow-right"></i></button>
                </form>
            </li>
        </>
    )
}

export default Logout;