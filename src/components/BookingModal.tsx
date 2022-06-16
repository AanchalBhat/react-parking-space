import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { setFormUserData } from "../reducers/parkingReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface BDTProps {
  children: React.ReactNode;
  onClose: () => void;
  id?: string;
}

const DialogBox = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogOpen: FC<BDTProps> = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const BookingModal = (props:any) => {
  const dispatch = useDispatch();
  const { userformdata } = useSelector((state: any) => ({
    userformdata: state.parkingSlot.userformdata,
  }));
  const [time, setTime] = useState<Date>(new Date());
  const [carnumber, setCarNumber] = useState("");

  const handleClose = () => {
    setCarNumber("");
    props.onClose();
  };

  const submitCarDetail = () => {
    if (carnumber !== "") {
      bookslot();
    } else {
      toast.error("Please enter car number.");
    }
  };
  const [freeSlots, setFreeSlots] = useState(0);

  const getFreeSlots = () => {
    const freeSlots = userformdata.filter(
      (slot: any) => slot.available == true
    ).length;
    setFreeSlots(freeSlots);
    return freeSlots;
  };
  const getRandomId = () => Math.floor(Math.random() * getFreeSlots());

  // return free slot Id
  const getBookingId = () => {
    const freeSpace = userformdata!.filter(
      (val: any) => val.available === true
    );
    if (freeSpace.length) {
      toast.success("Successfuly Registered.");
      return freeSpace[getRandomId()]!.bookingid;
    } else {
      return 0;
    }
  };
  const addToSlot = async (carNumber: string, time: Date) => {
    let carDetails = {
      carnumber: carNumber,
      bookingid: getBookingId(),
      available: false,
      cartiming: time,
      charge: 10,
    };
    const newSlots = [...userformdata];
    newSlots[carDetails.bookingid] = carDetails;
    console.log("booked slots", newSlots);
    await dispatch(setFormUserData(newSlots));
  };
  const bookslot = () => {
    var isPresent = userformdata.some((car: any) => {
      return car.carnumber === carnumber;
    });

    if (isPresent) {
      toast.error("Car number is Registered Already !");
      return;
    }

    addToSlot(carnumber, time);

    handleClose();
  };

  return (
    <DialogBox
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.isOpen}
    >
      <DialogOpen data-testid="customized-dialog-title" onClose={handleClose}>
        New Car Registration
      </DialogOpen>
      <DialogContent dividers>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props: any) => <TextField {...props} />}
            label="Car Arrival Time"
            value={time}
            onChange={(newValue: any) => {
              setTime(newValue as Date);
            }}
          />
        </LocalizationProvider>
        <TextField
          required
          inputProps={{ "data-testid": "content-input" }}
          label="Car Number"
          onChange={(e) => setCarNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={submitCarDetail}
          disabled={carnumber !== "" ? false : true}
          data-testid="parking-drawing-add-car-button"
        >
          Submit
        </Button>
      </DialogActions>
    </DialogBox>
  );
};

export default BookingModal;
