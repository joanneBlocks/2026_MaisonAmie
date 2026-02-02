import React from "react";
import Signin from "./components/Signin";

import { UserAuth } from "./context/AuthContext";

function App() {
  /* const { user } = UserAuth(); */

  // console.log(user);

  return (
    <>
      <Signin />
    </>
  );
}

export default App;