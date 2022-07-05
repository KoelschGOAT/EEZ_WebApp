import React, { useState, useCallback, useContext, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import "../../static/css/DisplaySelection.css";
import AppContext from "../../utils/Context/AppContext";
import screen from "../../static/img/screen.svg";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useQuery, useQueryClient } from "react-query";
import PopUp from "./PopUp";
const DisplaySelection = () => {
  const queryClient = useQueryClient();
  const { pcs, setPcs } = useContext(AppContext);
  const [allVideos, setAllVideos] = useState();
  const [selectedPC, setSelectedPC] = useState();
  const [popUp, setPopUp] = useState(false);
  const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const allPCs = useQuery(
    "all-pcs",
    ()=>fetchData(`http://192.168.178.21:8000/api/all-pcs`)
  );
  const allVids = useQuery("all-videos",()=>fetchData(`http://192.168.178.21:8000/api/all-videos`));
  const [error, setError] = useState(false);
    const isError = allPCs.isError || allVids.isError;
    const isLoading = allPCs.isLoading || allVids.isLoading;
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

  return (
    <>
      {isLoading ? (
        <div className="loading"><BarLoader loading={isLoading} color={"#00665a"} size={150} /></div>
      ) : null}
      {isError ? <div className="error">Err</div> : null}
      {allPCs && allVids && (
        <div className="grid" style={STYLE_WRAPPER}>
          {allPCs.data?.map((pc) => (
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
        <PopUp
          pc={selectedPC}
          allVideos={allVids.data}
          open={popUp}
          onClose={() => {
            setPopUp(false);
          }}
        />
      ) : null}
    </>
  );
};

export default DisplaySelection;
