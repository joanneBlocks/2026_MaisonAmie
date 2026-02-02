import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Dashboard from "./routes/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
