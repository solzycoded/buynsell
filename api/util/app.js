const randomStr = (target) => {
    return Math.random().toString(target);
}

const createToken = () => {
    return randomStr(36) + randomStr(23);
}

const App = {
    createToken,
}

export default App;

// GRASP PATTERNS
/*
    1. pure fabrication *
    2. high cohesion (purpose: hold functions that the api needs, but which doesn't relate to a model or to more than one controller) *
*/