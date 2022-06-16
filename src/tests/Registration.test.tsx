import React from "react";
import { getByTestId, render, screen, fireEvent } from "@testing-library/react";
import Registration from "../components/Registration";
import { Provider } from "react-redux";
import store from "../config/configureStore";
import { MemoryRouter } from "react-router";


describe("Registration", () => {
 
  test("submit button is disable initially", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Registration />
        </MemoryRouter>
      </Provider>
    );
    const button = getByTestId("parking-submit-button");
    expect(button).toBeDisabled();
  });

  test("submit button is enable ", () => {
    const { getByTestId } = render(
      <Provider store={store}>
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    </Provider>
    );
    const input = getByTestId("parking-text-input");
    fireEvent.change(input, {
      target: { value: "1" },
    });
    expect(getByTestId("parking-submit-button")).not.toBeDisabled();
  });
});
