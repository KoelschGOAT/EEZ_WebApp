import React,{useState} from "react";
import { Link } from "react-router-dom";
import "../static/css/Sidebar.css";
import { FcFilmReel } from "react-icons/fc";
import {CgAdd} from "react-icons/cg";
import DisplaySelection from "../components/DisplaySelection";
import AddVideo from "../components/AddVideo";
import EditVideo from "../components/EditVideo";
import { FaEdit } from "react-icons/fa";
import {MdOutlineModeEditOutline } from "react-icons/md";

const Sidebar = () => {
    document.title="Admin Übersicht"
	const [component,setComponent]=useState(1);
    
	return (
    <div className="AdminAreaWrapper">
      <div className="icon-bar">
        <a
          onClick={() => setComponent(1)}
          className={component === 1 ? " color" : "icon-element"}
        >
          {<FcFilmReel />}
        </a>
        <a
          onClick={() => setComponent(2)}
          className={component === 2 ? " color" : "icon-element"}
        >
          {<CgAdd />}
        </a>
        <a
          onClick={() => setComponent(3)}
          className={component === 3 ? " color" : "icon-element"}
        >
          {<FaEdit />}
        </a>
      </div>
      {component === 1 && <DisplaySelection />}
      {component === 2 && <AddVideo />}
      {component === 3 && <EditVideo />}
    </div>
  );
};

export default Sidebar;