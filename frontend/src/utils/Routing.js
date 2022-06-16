import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes
} from "react-router-dom";
import SingleVideo from "../pages/SingleVideo";
import{AppProvider} from "./AppContext";
import Landing from "../pages/Landing";
import Navbar from "../components/Navbar";
import DisplaySelection from "../components/DisplaySelection";
import AddVideo from "../components/AddVideo";
import EditVideo from "../components/EditVideo";
import AdminArea from "../pages/AdminArea";
function Routing() {
	return (
		<Router>
			<AppProvider>
				<Navbar/>
				<Routes>
					<Route index element={<Landing />}></Route>
					<Route path="SingleVideo" element={<SingleVideo/>}></Route>
					<Route path="AdminPage" element={<AdminArea />}>
					
					<Route path="selection"element={<DisplaySelection/>}></Route>
					<Route path="AddVideo" element={<AddVideo />}></Route>
					<Route path="EditVideo" element={<EditVideo />}></Route>
					</Route>
				</Routes>
			</AppProvider>
		</Router>
	);
}

export default Routing;