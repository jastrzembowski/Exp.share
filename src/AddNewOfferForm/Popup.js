import { DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import ActionButton from "./ActionButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

export default function Popup(props) {
  const { children, openPopup, setOpenPopup } = props;
  return (
      <Dialog open={openPopup} maxWidth="xl">
        <DialogTitle style={{ backgroundColor: "#E3DEBE" }}>
          <div style={{ display: "flex" }}>
            <Typography
              variant="h5"
              component="div"
              style={{ fontFamily: "Lobster", flexGrow: 1, color: "#12105B" }}
            >
              <b> Dodaj swoją ofertę</b>
            </Typography>
            <ActionButton
              onClick={() => {
                setOpenPopup(false);
              }}
            >
              <CloseIcon />
            </ActionButton>
          </div>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
  );
}
