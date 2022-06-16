import React from "react";
import { getByTestId, render, screen, fireEvent } from "@testing-library/react";
import BookingModal from "../components/BookingModal";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import store from "../config/configureStore";

describe("Booking", () => {
  test("check if submitted button is enabled", () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookingModal isOpen={true} />
        </MemoryRouter>
      </Provider>
    );
    const input = screen.getByTestId("content-input");
    fireEvent.change(input, {
      target: { value: "00000" },
    });

     expect(screen.getByTestId("parking-drawing-add-car-button")).not.toBeDisabled();

  });
});
