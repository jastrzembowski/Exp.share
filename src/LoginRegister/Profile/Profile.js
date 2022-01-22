import React, { useRef, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../contexts/AuthContext";
import { AiFillProfile } from "react-icons/ai";

export default function Profile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [state, setState] = React.useState({ right: false });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  var name = currentUser.email.substring(0, currentUser.email.indexOf("@"));

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    setMessage("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        setMessage("Pomyślnie zaaktualizowano konto!");
      })
      .catch(() => {
        setError("Problem z zaaktualizowaniem konta");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div style={{ alignSelf: "center" }}>
      <React.Fragment key={"left"}>
        <li button onClick={toggleDrawer("left", true)} className="menu-but">
          <AiFillProfile style={{ marginRight: "5px" }} />
          Twój profil
        </li>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          style={{ zIndex: 4 }}
        >
          <div className="profile-drawer_container">
            <div className="profile-drawer">
              <h1
                style={{
                  fontSize: "40px",
                  marginTop: "15%",
                  fontFamily: "Lobster, cursive",
                  color: "#e3debe",
                }}
              >
                Witaj {name} !
              </h1>
              <h1
                style={{
                  fontSize: "30px",
                  marginTop: "40px",
                  textAlign: "center",
                  fontFamily: "Raleway",
                  letterSpacing: "1px",
                  color: "#e3debe",
                }}
              >
                <b>Tutaj możesz edytować swoje dane</b>
              </h1>

              <form onSubmit={handleSubmit} className="profile-form">
                <label for="fmail"> Nowy email</label>
                <input
                  required
                  ref={emailRef}
                  type="email"
                  id="fmail"
                  name="fmail"
                />
                <label for="password">Nowe hasło</label>
                <input
                  required
                  ref={passwordRef}
                  type="password"
                  id="password"
                  name="password"
                />
                <label for="password">Powtórz hasło</label>
                <input
                  required
                  ref={passwordConfirmRef}
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
                  Zapisz zmiany{" "}
                </Button>
              </form>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
