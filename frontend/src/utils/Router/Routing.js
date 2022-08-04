import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleVideo from "../../pages/SingleVideo";
import { AppProvider } from "../Context/AppContext";
import Landing from "../../pages/Landing";
import Navbar from "../../components/Navbar";

import Slider from "../../components/Slider";
import AdminArea from "../../pages/AdminArea";
import VideoSelection from "../../components/VideoSelection/VideoSelection";
import DisplaySelection from "../../components/DisplaySelection/DisplaySelection";
function Routing() {
  return (
    <Router>
      <AppProvider>
        <Navbar />
        <Routes>
          <Route index element={<Landing />}></Route>
          <Route path="SingleVideo" element={<SingleVideo />}></Route>
          <Route path="Admin" element={<AdminArea />}></Route>
          <Route path="videos" element={<VideoSelection/>}></Route>
          <Route path="clients" element={<DisplaySelection/>}></Route>
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default Routing;
