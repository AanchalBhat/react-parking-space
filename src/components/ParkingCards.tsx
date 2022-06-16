import React from "react";
import { Box, Typography } from "@mui/material";


const ParkingCards = (props:any) => {
  return (
    <Box className="cards">
      {props.cardata.length &&
        props.cardata.map((car:any) => (
          <Box
            id={`parking-drawing-space-number-${car.bookingid}`}
            key={car.bookingid}
          >
            <Box
              className={`${car.available ? "card" : "carbooked"}`}
              id={`${
                car.available
                  ? `parking-drawing-space-${car.bookingid}`
                  : `parking-drawing-registered-${car.bookingid}`
              }`}
              onClick={() => {
                if (!car.available) {
                  props.setSingleitem(car);
                  props.handlePaymentModal();
                }
              }}
            >
              <Typography variant="h4" gutterBottom>
                CODE- {car.bookingid}
              </Typography>
              <Typography variant="body1" component="span">
                {car.available ? "Available" : "Booked"}
              </Typography>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default ParkingCards;
