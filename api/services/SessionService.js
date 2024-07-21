class SessionService {
    static set(user, req){
        req.session.user = user;
    }

    static setName(req, name){
        req.session.user.name = name;
    }

    static setVerified(req, verified){
        req.session.user.verified = verified;
    }

    static isAuthenticated(req, res, next) {
        if (req.session.user) {
            return next();
        } else {
            res.status(401).json({ success: false, data: "You're not authorized to perform this action!" });
        }
        return;
    }

    static destroy(req){
        delete req.session.user;
    }
}

export default SessionService;

// GRASP PATTERNS
/*
    1. pure fabrication (responsiblity: create, update and manage user session variable)
    2. high cohesion (single purpose: create, update and manage user session variable)
    3. low coupling
*/