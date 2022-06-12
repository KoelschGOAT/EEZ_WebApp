import React,{useState,useContext} from 'react'

import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import SingleVideo from "../pages/SingleVideo"
import AppContext,{AppProvider} from "./AppContext";
import Landing from '../pages/Landing'
import Navbar from "../components/Navbar";
import AddVideo from "../components/AddVideo"
function Routing() {
    return (
        <Router>
            <AppProvider>
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={<Landing />}></Route>
                    <Route path="/SingleVideo" element={<SingleVideo/>}></Route>
                    <Route path="/AddVideo" element={<AddVideo />}></Route>
                </Routes>
            </AppProvider>
        </Router>
    )
}

export default Routing