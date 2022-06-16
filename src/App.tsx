import React from "react";
import store from "./config/configureStore";
import { Provider } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";
import MyRoutes from "./MyRoutes";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  return (
    
      <Provider store={store}>
        <BrowserRouter>
          <MyRoutes />
          <ToastContainer/>
        </BrowserRouter>
      </Provider>
    
  );
};
export default App;
