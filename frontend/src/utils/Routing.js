import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import Landing from '../pages/Landing'
function Routing() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Landing />}></Route>
            </Routes>
        </Router>
    )
}

export default Routing