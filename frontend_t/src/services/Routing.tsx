import React from 'react';
import {
  BrowserRouter,
  NavLink, Route, Routes
} from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
function Routing() {
  return (
    <BrowserRouter>
    <Routes>
     <Route  path='/'element={<Navbar/>}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default Routing