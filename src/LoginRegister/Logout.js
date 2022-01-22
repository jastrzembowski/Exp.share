import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";

export default function Logout() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  async function handleLogout() {
    try {
      setError("");
      setMessage("Pomyślnie wylogowano!");
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div>
      <li button onClick={() => handleLogout()} className="menu-but">
        <MdExitToApp style={{ marginRight: "5px" }} />
        Wyloguj się
      </li>
    </div>
  );
}
