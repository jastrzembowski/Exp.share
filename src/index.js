import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Nav/Navbar";
import Main from "./Main/Main";
import OfferCards from "./offers/OfferCards";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/prices" element={<OfferCards />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
