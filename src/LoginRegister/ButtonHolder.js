import React from "react";
import { useAuth } from "../contexts/AuthContext";
import LoginHome from "./LoginHome";
import SignupHome from "./SignupHome";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button"
export default function ButtonHolder() {
  const { currentUser } = useAuth();
  return (
    <div>
      <>
        {!currentUser ? (
          <>
          <div className="buttons-holder">
            <LoginHome />
            <SignupHome />
            </div>
          </>
        ) : (
          <>
          <h1>{currentUser.displayName}</h1>
          <Button 
          style={{
            width: "370px",
            height: "70px",
            border: "solid",
            borderColor: "white",
            backgroundColor: "white",
            color: "none",
            fontSize: "20px",
            padding: "2px",
            marginRight: "10px",
            zIndex: 3,
            justifyContent: "center",
            fontFamily: "Raleway",
                  letterSpacing: "1px"
        }} component={Link} to="/prices">
            Sprawdź najnowsze oferty </Button>
            </>
        )}
      </>
    </div>
  );
}
