import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/headers/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Edit from "./pages/edit/Edit";
import Profile from "./pages/profile/Profile";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/userprofile/:id" element={<Profile />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
