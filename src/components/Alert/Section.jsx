const Alert = () => {
    return (
        <div className="d-flex fixed-bottom justify-content-evenly alert-message hide">
            <button className="alert-message-container">
                <span className="alert-message-content"></span>
            </button>
        </div>
    );
}

export default Alert;