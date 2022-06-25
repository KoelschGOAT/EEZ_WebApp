import React, { useState, useCallback, useContext, useEffect } from "react";

import AppContext from "../../utils/Context/AppContext";
import screen from "../../static/img/screen.svg";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

import PopUp from "./PopUp";
const DisplaySelection = () => {
  const { pcs, setPcs } = useContext(AppContext);
  const [allVideos, setAllVideos] = useState();
  const [selectedPC, setSelectedPC] = useState();
  const [popUp, setPopUp] = useState(false);

  const [error, setError] = useState(false);
  const getPCs = useCallback(async () => {
    await axios
      .get("http://192.168.178.21:8000/api/all-pcs")
      .then((resp) => {
        setPcs(resp.data);
      })
      .catch(function (error) {
        setError(true);
      });
  }, [setPcs]);
  const getAllVideos = useCallback(async () => {
    await axios
      .get("http://192.168.178.21:8000/api/all-videos")
      .then((resp) => {
       
        setAllVideos(resp.data);
      })
      .catch(function (error) {
        setError(true);
      });
  }, [setAllVideos]);
  const STYLE_WRAPPER = {
    width: "100vmax",
    height: "100px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 200px)",
    gridTemplateRows: "repeat(3)",
    justifyContent: "center",
    gridGap: "10vmin",
    marginTop: "2rem",
  };
  useEffect(() => {
    getPCs();
    getAllVideos();
  }, [getPCs,getAllVideos]);
  return (
    <>
      {!error && (
        <div className="grid" style={STYLE_WRAPPER}>
          {pcs?.map((pc) => (
            <div key={pc.id} className="wrapper">
              <Card
                sx={{ minWidth: "150px" }}
                onClick={() => {
                  setSelectedPC(pc);
                  setPopUp(true);
                }}
                className="Card"
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: "center" }}>
                    <img src={screen} alt="PC Logo" width="50px" />

                    <Typography variant="body2" color="text.secondary">
                      {pc.pc_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pc.ip_address}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </div>
      )}
      {popUp ? (
        <PopUp pc={selectedPC} allVideos={allVideos} open={popUp} onClose={() => setPopUp(false)} />
      ) : null}
    </>
  );
};

export default DisplaySelection;
