import React, { useState, useCallback, useContext, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import "../../static/css/DisplaySelection.css";
import AppContext from "../../utils/Context/AppContext";
import screen from "../../static/img/screen.svg";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Snackbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useQuery, useQueryClient } from "react-query";
import { GrAdd } from "react-icons/gr";
import PopUp from "./PopUp";
import AddPCPopUp from "./AddPCPopUp";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Feedback/Loader";
import Notification from "../Feedback/Notification";
import SnackbarNoti from "../Feedback/SnackbarNoti";

import "react-toastify/dist/ReactToastify.css";
const DisplaySelection = () => {
  const queryClient = useQueryClient();
  const [selectedPC, setSelectedPC] = useState();
  const [popUp, setPopUp] = useState(false);
  const [addPopUp, setAddPopUp] = useState(false);
  const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const allPCs = useQuery("all-pcs", () =>
    fetchData(`http://127.0.0.1:8000/api/all-pcs`)
  );
  const allVids = useQuery("all-videos", () =>
    fetchData(`http://127.0.0.1:8000/api/all-videos`)
  );
  const isError = allPCs.isError || allVids.isError;
  const isLoading = allPCs.isLoading || allVids.isLoading;
  const data = allVids.data || allPCs.data;
  const STYLE_WRAPPER = {
    width: "100vmax",
    height: "100px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 200px)",
    gridTemplateRows: "repeat(3)",
    justifyContent: "center",
    gridGap: "5vmin",
    margin: "2rem 0 2rem 0",
  };

  const responseReturn = () => {
    <Loader loading={isLoading} />;

    if (isError) {
      return (
        <Notification
          Title="Fehler"
          Message="Ein unerwarteter Fehler ist aufgetreten"
        />
      );
    }
  };
  return (
    <>
      {responseReturn()}

      <h1 className="title">
        <span className="greenstripe">Einstellungen</span>
        <span className="redstripe">Clients</span>
      </h1>
      {data && !isLoading && !isError && (
        <div className="grid" >
          <div className="wrapper">
            <Card
              variant="outlined"
              sx={{ width: "150px" }}
              onClick={() => {
                setAddPopUp(true);
              }}
              className="Card"
            >
              <CardContent
                sx={{
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <GrAdd size={"3em"} />

                <Typography variant="body1" color="text.secondary">
                  PC <br />
                  Hinzufügen
                </Typography>
              </CardContent>
            </Card>
          </div>
          {allPCs.data?.map((pc) => (
            <div key={pc.id} className="wrapper">
              <Card
                variant="outlined"
                sx={{ width: "150px" }}
                onClick={() => {
                  setSelectedPC(pc);
                  setPopUp(true);
                }}
                className="Card"
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <img src={screen} alt="PC Logo" width="50px" />

                  <Typography variant="body2" color="text.secondary">
                    {pc.pc_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pc.ip_address}
                  </Typography>
                </CardContent>
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
      {addPopUp ? (
        <AddPCPopUp
          open={addPopUp}
          onClose={() => {
            setAddPopUp(false);
          }}
          allVideos={allVids.data}
        />
      ) : null}
    </>
  );
};

export default DisplaySelection;
