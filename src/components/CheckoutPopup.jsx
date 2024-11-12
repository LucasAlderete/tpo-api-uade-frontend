import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const CheckoutPopup = ({ open, onClose, message }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Estado de la compra</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Aceptar
      </Button>
    </DialogActions>
  </Dialog>
);

export default CheckoutPopup;
