//import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserNavbar from "./components/UsersNavbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AddComplaint from "./components/AddComplaint";
import ComplaintsNavBar from "./components/ComplaintsNavBar";
import UpdateComplaint from "./components/UpdateComplaint";
import ShowComplaint from "./components/ShowComplaint";
import Logout from "./components/Logout";
import UpdateStatus from "./components/UpdateStatus";

function App() {
  let path = window.location.pathname;
  if (path == "/" || path == "/signup") {
    return (
      <>
        <BrowserRouter>
          <UserNavbar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  return (
    <>
      <BrowserRouter>
        <ComplaintsNavBar />
        <Routes>
          <Route path="/add" element={<AddComplaint />} />
          <Route path="/show" element={<ShowComplaint />} />
          <Route path="/update" element={<UpdateComplaint />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/updateStatus" element={<UpdateStatus />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
