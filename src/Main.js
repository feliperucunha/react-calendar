import React, { useContext } from "react";

import { GlobalSnackbar } from "./components";
import { MainContext } from "./context";
import Routes from "./routes";

function Main() {
  const {
    state: { snackbar },
  } = useContext(MainContext);
  return (
    <>
      <Routes />
      {snackbar && <GlobalSnackbar />}
    </>
  );
}

export default Main;
