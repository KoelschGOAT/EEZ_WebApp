import React,{ useState} from "react";
import Sidebar from "../components/Sidebar";
import "../static/css/AdminArea.css";

import { FcFilmReel } from "react-icons/fc";
import { MdSmartDisplay } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import DisplaySelection from "../components/DisplaySelection";
import AddVideo from "../components/AddVideo";
import EditVideo from "../components/EditVideo";
const AdminArea = () => {
	const [component,setComponent]=useState(1);
	return (

		<div className="AdminAreaWrapper">
			<div className="icon-bar">
				<a onClick={()=>setComponent(1)}className="color" >{<MdSmartDisplay />}</a>
				<a onClick={()=>setComponent(2)}className="icon-element" >{<FcFilmReel />}</a>
				<a onClick={()=>setComponent(3)}className="icon-element" >{<BiEdit />}</a>

			</div>
		{component===1&&<DisplaySelection/>}	
		{component===2&&<AddVideo/>}
		{component===3&&<EditVideo/>}
		</div>

	);
};

export default AdminArea;