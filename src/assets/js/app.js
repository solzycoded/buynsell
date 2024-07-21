// ALERT
const getElement = (selector) => {
    return document.querySelector(selector);
}

const addClass = (selector, targetClass) => {
    getElement(selector).classList.add(targetClass);
}

const removeClass = (selector, targetClass) => {
    getElement(selector).classList.remove(targetClass);
}

const setAlertTimer = function(){
    setTimeout(resetAlert, 7000); // change the TIME LIMIT
    clearTimeout(this);
}

const resetAlert = function(){
    addClass(".alert-message", "hide");
    removeClass(".alert-message", "show");
}

const showAlert = function(success, message){
    // remove alert, after * seconds
    setAlertTimer();

    // show alert element
    addClass(".alert-message", "show");
    removeClass(".alert-message", "hide");

    // set content
	setAlertContent(success, message);
}

const setAlertContent = function(success, message){
    // set success or failure
    const targetClass = success ? "success" : "failure";

    addClass('.alert-message-container', targetClass);
    removeClass('.alert-message-container', (success ? "failure" : "success"));

    const messageContainer     = getElement('.alert-message-container');
    messageContainer.innerHTML = message;
}

const App = {
    showAlert,
}

export default App;