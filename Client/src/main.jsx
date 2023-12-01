import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./Context/UserContext.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Dashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </UserContextProvider>
);
