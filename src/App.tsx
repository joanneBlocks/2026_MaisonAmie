/* import React from "react"; */
import Signin from "./components/Signin";
import Header from "./components/Header";
import "./App.css";

/* import { UserAuth } from "./context/AuthContext"; */

function App() {
  /* const { user } = UserAuth(); */
  // console.log(user);

  return (
    <>
      <Header />

      <div className="container">
        <Signin />
      </div>
    </>
  );
}

export default App;
