import SessionService from "../services/SessionService.js";

const checkAuth = (req, res) => {
    try {
        if (req.session.user) {
            res.status(200).send({ authenticated: true, user: req.session.user });
        }
        else {
            res.status(201).send({ authenticated: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: error.message });
    }
}

const logout = (req, res) => {
    try {
        SessionService.destroy(req);

        res.status(200).send({ success: (req.session.user ? false : true) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: error.message });
    }
}

const SessionController = {
    checkAuth,
    logout,
}

export default SessionController;