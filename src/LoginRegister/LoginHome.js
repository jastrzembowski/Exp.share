import Dialog from "@material-ui/core/Dialog";
import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openPassword, setOpenPassword] = React.useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePasswordOpen = () => {
    setOpenPassword(true);
  };

  const handlePasswordClose = () => {
    setOpenPassword(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      handleClose();
      setMessage("Pomyślnie zalogowano!");
      navigate("/");
    } catch {
      setError("Sprawdź adres email lub hasło");
    }
    setLoading(false);
  }
  async function handleSubmitReset(e) {
    e.preventDefault();

    try {
      setPassError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Sprawdź swoją skrzynkę pocztową!");
    } catch {
      setPassError("Nie udało się zresetować hasła");
    }
    setLoading(false);
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        style={{
          width: "250px",
          height: "70px",
          border: "solid",
          borderColor: "white",
          color: "white",
          fontSize: "25px",
          padding: "2px",
          marginRight: "10px",
          zIndex: 3,
          fontFamily: "Raleway",
          letterSpacing: "1px",
        }}
      >
        Logowanie
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className="card-container">
          <h2>Logowanie</h2>
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
            <Button
              disabled={loading}
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#731515",
                color: "white",
                marginTop: "20px",
                fontFamily: "Raleway",
                letterSpacing: "1px",
              }}
              className="w-100"
              type="submit"
            >
              Zaloguj się
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                marginTop: "6px",
              }}
              onClick={() => handlePasswordOpen()}
            >
              Nie pamiętasz hasła? Kliknij tu!
            </div>
          </form>
        </div>
      </Dialog>
      <Dialog
        open={openPassword}
        onClose={handlePasswordClose}
        aria-labelledby="form-dialog-title"
      >
        <div className="card-container">
          <h2>Resetuj hasło</h2>
          <form onSubmit={handleSubmitReset} className="card-form">
            <label for="fmail">Wpisz swój adres email</label>
            <input
              required
              ref={emailRef}
              type="email"
              id="fmail"
              name="fmail"
            />
            {passError && <Alert variant="danger">{passError}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Button
              disabled={loading}
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#731515",
                color: "white",
                marginTop: "30px",
                fontFamily: "Raleway",
                letterSpacing: "1px",
              }}
              className="w-100"
              type="submit"
            >
              Wyślij
            </Button>
          </form>
        </div>
      </Dialog>
    </>
  );
}
