import Dialog from "@material-ui/core/Dialog";
import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { MdPersonAdd } from "react-icons/md";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setMessage("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      handleClose();
      setMessage("Pomyślnie założono konto!");
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  return (
    <>
      <li button onClick={handleClickOpen} className="menu-but">
        <MdPersonAdd style={{ marginRight: "5px" }} />
        Rejestracja
      </li>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className="register-card-container">
          <h2>Rejestracja</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit} className="card-form">
            <label for="fmail">Email</label>
            <input
              required
              ref={emailRef}
              type="email"
              id="fmail"
              name="fmail"
            />
            <label for="password">Hasło</label>
            <input
              required
              ref={passwordRef}
              type="password"
              id="password"
              name="password"
            />
            <label for="password-confirm">Potwierdź hasło</label>
            <input
              required
              ref={passwordConfirmRef}
              type="password"
              id="password-confirm"
              name="password-confirm"
            />
            <Button
              disabled={loading}
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#731515",
                color: "white",
                marginTop: "20px",
              }}
              className="w-100"
              type="submit"
            >
              Zarejestruj się
            </Button>
          </form>
        </div>
      </Dialog>
    </>
  );
}
