import React from "react";
import { getByTestId, render, screen, fireEvent } from "@testing-library/react";
import ParkingSlot from "../components/ParkingSlot";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import store from "../config/configureStore";

describe("Parking Lot Checking", () => {
  test("check if Booking Modal gets open", () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ParkingSlot />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText(/Book Your Space/i));

    expect(screen.getByText(/New Car Registration/i)).toBeInTheDocument();
  });
});
