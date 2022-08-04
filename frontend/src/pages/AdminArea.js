import React, { useState } from "react";

//TODO: Shadow Area
import { useNavigate, Link, useLocation, NavLink } from "react-router-dom";

import { IconContext } from "react-icons";
import { FcFilmReel } from "react-icons/fc";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FcTabletAndroid } from "react-icons/fc";
import "../static/css/AdminArea.css";
const AdminArea = () => {
  let navigate = useNavigate();
  document.title = "Admin Übersicht";
  return (
    <>
      <IconContext.Provider value={{ color: "#000000" }}>
        <h1 className="title">
          <span className="greenstripe">Geräte</span>
          <span className="redstripe">Einstellungen</span>
        </h1>
        <div className="CardViewWrapper">
          <Card className="Card"sx={{width:"25%"}} onClick={() => navigate("/clients")}>
            <CardContent sx={{ textAlign: "center", justifyContent: "center" }}>
              <FcTabletAndroid size={"3em"} />

              <Typography variant="body2" color="text.secondary">
                <h1>
                  Client
                  <br />
                  Einstellungen
                </h1>
              </Typography>
            </CardContent>
          </Card>

          <Card className="Card" sx={{width:"25%"}}onClick={() => navigate("/videos")}>
            <CardContent sx={{ textAlign: "center", justifyContent: "center" }}>
              <FcFilmReel size={"3em"} />

              <Typography variant="body2" color="text.secondary">
                <h1>
                  Video
                  <br />
                  Einstellungen
                </h1>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default AdminArea;
