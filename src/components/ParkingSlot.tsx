import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ParkingCards from "./ParkingCards";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./BookingModal";
import PaymentModal from "./PaymentModal";
import { setFormUserData } from "../reducers/parkingReducer";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ParkingSlot = () => {
  const { userformdata } = useSelector((state: any) => ({
    userformdata: state.parkingSlot.userformdata,
  }));
  const [availiableSlot, setAvailableSlot] = useState(userformdata.length);

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (state == null) {
      return navigate("/");
    }
    let availableslots: any[] = userformdata.filter(
      (val: any) => val.available === true
    );
    if (availableslots.length <= 0) {
      toast.error("Parking Slot Full");
    }
    setAvailableSlot(availableslots.length);
  }, [userformdata]);

  const [singleitem, setSingleitem] = useState({
    carnumber: "",
    bookingid: 1,
    available: true,
    cartiming: "",
    charge: "",
  });
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handlePaymentModal = () => {
    calculateAmount(singleitem);
    setPaymentModalOpen((prev) => !prev);
  };

  const handleModalOpen = () => {
    setOpen((prev) => !prev);
  };
  const removeFromSlot = async (bookingid: number) => {
    const newSlots = [...userformdata];
    let slot: any = newSlots[bookingid];
    let newObj = { ...slot };
    newObj.available = true;
    newObj.carnumber = "";
    newObj.cartiming = "";
    newObj.charge = "";
    newSlots[bookingid] = newObj;
    console.log("newslots123", newObj, newSlots);
    await dispatch(setFormUserData(newSlots));
  };
  //first 2 ours 10 den 10 increase
  const [charges, setCharges] = useState(0);
  const calculateAmount = (singleitem: any) => {
    var now = moment(new Date()); //todays date
    var end = moment(singleitem.cartiming); // another date
    var duration = moment.duration(now.diff(end));

    var hours: number = duration.asHours();
    console.log("amount123===", now, end, hours);
    if (hours > 2) {
      var charges: number = 10 + (hours - 2) * 10;
      setCharges(charges);
    } else {
      setCharges(10);
    }
  };

  const Payment = async () => {
    console.log("singleItem", singleitem);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "car-registration": singleitem.carnumber,
        charge: charges,
      }),
    };

    const res = await fetch("https://httpstat.us/200", requestOptions);
    console.log("response", res);
    if (res) {
      removeFromSlot(singleitem.bookingid);
    }

    handlePaymentModal();
  };

  return (
    <div>
      <h2>Available Parking Slots</h2>
      <Box>
        <Box className="parkingspace">
          <Box className="tophead">
            <Button
              data-testid="button1"
              className="dash"
              variant="contained"
              color="primary"
              onClick={handleModalOpen}
              
            >
              Book Your Space +
            </Button>
            <Button className="dash" variant="contained" color="primary">
              Total Available Spaces : {availiableSlot}
            </Button>

            <Button className="dash" variant="contained" color="primary">
              Total Spaces :{userformdata.length}
            </Button>
          </Box>
          {open && <Modal isOpen={open} onClose={handleModalOpen} />}
          {isPaymentModalOpen && (
            <PaymentModal
              isOpen={isPaymentModalOpen}
              toggleModal={handlePaymentModal}
              car={singleitem}
              calculateAmount={charges}
              payment={Payment}
            />
          )}
          <ParkingCards
            cardata={userformdata}
            handlePaymentModal={handlePaymentModal}
            setSingleitem={setSingleitem}
          />
        </Box>
      </Box>
    </div>
  );
};

export default ParkingSlot;
