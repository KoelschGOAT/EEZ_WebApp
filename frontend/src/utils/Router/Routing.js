import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleVideo from "../../pages/SingleVideo";
import { AppProvider } from "../Context/AppContext";
import Landing from "../../pages/Landing";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Slider from "../../components/Slider";
function Routing() {
  return (
    <Router>
      <AppProvider>
        <Navbar />
        <Routes>
          <Route index element={<Landing />}></Route>
          <Route path="SingleVideo" element={<SingleVideo />}></Route>
          <Route path="AdminPage" element={<Sidebar />}></Route>
		  <Route path="GQL" element={<Slider/>}></Route>
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default Routing;
