import React,{ useState} from "react";
import "../static/css/AdminArea.css";
//TODO: Shadow Area

import DisplaySelection from "../components/DisplaySelection";
import AddVideo from "../components/AddVideo";
import EditVideo from "../components/EditVideo";
import { FcFilmReel } from "react-icons/fc";
import {CgAdd} from "react-icons/cg";
import { FaEdit  } from "react-icons/fa";
const AdminArea = () => {
	const [component,setComponent]=useState(1);
	return (

		<div className="AdminAreaWrapper">
			<div className="icon-bar">
				<a onClick={()=>setComponent(1)}className="color" >{<FcFilmReel />}</a>
				<a onClick={()=>setComponent(2)}className="icon-element" >{<CgAdd />}</a>
				<a onClick={()=>setComponent(3)}className="icon-element" >{<FaEdit />}</a>

			</div>
		{component===1&&<DisplaySelection/>}	
		{component===2&&<AddVideo/>}
		{component===3&&<EditVideo/>}
		</div>

	);
};

export default AdminArea;