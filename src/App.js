import { AuthProvider } from "./components/Auth/AuthContext.jsx";

// css
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

import "./assets/css/app.css";
import "./assets/css/wishlist.css";

// js
import "../node_modules/bootstrap/dist/js/bootstrap.js";

import PageRoutes from "./routes/Routes.js";

import "./assets/js/app.js";

function App(){
  return (
    <AuthProvider>
      <PageRoutes />
    </AuthProvider>
  )
}

export default App;