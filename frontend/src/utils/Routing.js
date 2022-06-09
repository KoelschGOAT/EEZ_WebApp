import React,{useState,useContext} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import AppContext,{AppProvider} from "./AppContext";
import Landing from '../pages/Landing'
function Routing() {
    return (
        <Router>
            <AppProvider>
                <Routes>
                    <Route exact path="/" element={<Landing />}></Route>
                </Routes>
            </AppProvider>
        </Router>
    )
}

export default Routing