import React from "react";
import ReactDOM from "react-dom/client";
import Body from "../src/components/Body";
import { BrowserRouter, Routes, Route } from "react-router";
import Registration from "./components/Registration";
import MyBookings from "./components/MyBookings";
import BookVehicle from "./components/BookVehicle";
import NavBar from "./components/NavBar";
import CheckAvailability from "./components/CheckAvailability";
import { Provider } from "react-redux";
import Store from "../Utils/AppStore";

const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route
              path="/vehicle/registration"
              element={<Registration />}
            ></Route>
            <Route
              path="/vehicle/CheckAvailablity"
              element={<CheckAvailability />}
            ></Route>
            <Route path="/bookVehicle" element={<BookVehicle/>}></Route>
            <Route path="/myBookings" element={<MyBookings/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
