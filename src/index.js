import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import AppRoutes from "./routes/AppRoutes";
import reportWebVitals from "./reportWebVitals";
import "./lang/i18n";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/authContext";
import LoadingProvider from "./context/loadingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <LoadingProvider>
        <AuthProvider>
            <Router>
                <React.StrictMode>
                    <AppRoutes />
                </React.StrictMode>
            </Router>
        </AuthProvider>
    </LoadingProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
