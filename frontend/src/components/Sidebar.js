import React from "react";
import { Link } from "react-router-dom";
import "../static/css/Sidebar.css";
import { FcFilmReel } from "react-icons/fc";
import {CgAdd} from "react-icons/cg";

import {MdOutlineModeEditOutline } from "react-icons/md";

const Sidebar = () => {
    return (
        <>
            <div className="icon-bar">
                <Link className="color"to="Selection">{<FcFilmReel />}</Link>
                <Link className="icon-element"to="AddVideo">{<CgAdd />}</Link>
                <Link className="icon-element"to="EditVideo">{<MdOutlineModeEditOutline />}</Link>
            </div>
        </>

    );
};

export default Sidebar;