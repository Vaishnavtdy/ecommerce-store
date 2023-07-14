import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../../components";
import { Provider } from "react-redux";
import { store } from "../../store/store";

const RootLayout = () => {
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <main style={{ paddingTop: "4.5rem" }}>
          <Outlet />
        </main>
      </Provider>
    </>
  );
};

export default RootLayout;
