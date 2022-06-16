import React from "react";
import { getByTestId, render, screen, fireEvent } from "@testing-library/react";
import PaymentModal from "../components/PaymentModal";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import store from "../config/configureStore";

describe("Payment Modal", () => {
  test("check Pay button is there", () => {
    const modal = () => {
      console.log("selected");
    };
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PaymentModal isOpen={true} car />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("payment-paid")).toBeInTheDocument();
  });
});
