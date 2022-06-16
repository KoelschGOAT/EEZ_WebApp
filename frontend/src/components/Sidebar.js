import React from "react";
import { Link } from "react-router-dom";
import "../static/css/Sidebar.css";
import { FcFilmReel } from "react-icons/fc";
import { MdSmartDisplay } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

const Sidebar = () => {
    return (
        <>
            <div className="icon-bar">
                <Link className="color"to="Selection">{<MdSmartDisplay />}</Link>
                <Link className="icon-element"to="AddVideo">{<FcFilmReel />}</Link>
                <Link className="icon-element"to="EditVideo">{<BiEdit />}</Link>

            </div>
        </>

    );
};

export default Sidebar;