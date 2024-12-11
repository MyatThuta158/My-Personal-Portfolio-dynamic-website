import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./Components/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./Routes/AdminRoutes.jsx";
import Login from "./Components/Login.jsx";
import { AuthProvider } from "./Components/Auth.jsx";
import RequireAuth from "./Components/RequireAuth.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/*"
            element={
              <RequireAuth>
                <AdminRoutes />
              </RequireAuth>
            }
          />
          <Route path="/loginMTT" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
