import React, { useState, useEffect } from "react";
import { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";

  const PaymentModal= (props:any) => {

  const calculateTime = (singleitem: any) => {
    var now = moment(new Date()); //todays date
    var end = moment(singleitem.cartiming); // another date
    var duration = moment.duration(now.diff(end));
    var hours: number = Math.floor(duration.asHours());
    var minutes: number = Math.floor(duration.asMinutes());
    var seconds:number = duration.asSeconds()
    return `hours:${hours} minutes:${minutes} seconds:${seconds}`
  };

 
  return (
    <Dialog open={props.isOpen} onClose={props.toggleModal}>
      <DialogTitle>Payment</DialogTitle>
      <DialogContent>
        <DialogContentText>
         For Exit of Car Number{" "}
          <i id="deregister-car-registration">{props.car.carnumber}</i>{" "}Please Pay Amount
        </DialogContentText>
        <DialogContentText >
          Total Time spend is {" "}{calculateTime(props.car)}
        </DialogContentText>
        <TextField
          id="deregister-charge"
          label="Amount"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ readOnly: true }}
          variant="standard"
          value={props.calculateAmount + " $"}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.toggleModal}
          variant="outlined"
          color="error"
          id="deregister-back-button"
        >
          Back
        </Button>
        <Button
          onClick={props.payment}
          variant="contained"
          color="success"
          data-testid="payment-paid"
        >
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;
