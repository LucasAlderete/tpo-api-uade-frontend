import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ErrorPopup = ({ open, onClose, title, message, severity = "info" }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText color={severity === "error" ? "error" : "textPrimary"}>
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Aceptar
      </Button>
    </DialogActions>
  </Dialog>
);

export default ErrorPopup;