import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFormUserData } from "../reducers/parkingReducer";
import { Box, Typography } from "@mui/material";

const Registration = () => {
  const dispatch = useDispatch();
  const [space, setSpace] = useState("");
  const history = useNavigate();
  const handleChange = async (e: any) => {
    console.log("space===", space);
    let tot_space: number = Number(space);
    if(tot_space>=1){
        const cardata: any[] = Array(tot_space)
        .fill(0)
        .map((_, index) =>
          Object({
            carnumber: "",
            bookingid: index,
            available: true,
            cartiming: "",
            charges: "",
          })
        );
      console.log("carData", cardata);
      await dispatch(await setFormUserData(cardata));
      history("./parking", { state: space });
    }else{
        console.log('Please enter space more than 1')
    }
   
  };

  return (
    <Box>
      <Box className="main">
        <Box className="form">
          <Typography variant="h5" fontWeight={600}>
            Enter your Required space
          </Typography>
          <Box component="form">
            <input
              type="number"
              name="space"
              value={space}
              onChange={(e) => setSpace(e.target.value)}
              placeholder="Enter your required parking space."
              data-testid="parking-text-input"
            />
            <br />
            <input
              type="submit"
              value="Submit"
              onClick={handleChange}
              disabled={!space}
              data-testid="parking-submit-button"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Registration;
