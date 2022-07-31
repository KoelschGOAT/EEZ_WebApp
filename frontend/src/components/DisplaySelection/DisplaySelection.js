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
import { GrAdd } from "react-icons/gr";
import PopUp from "./PopUp";
import AddPCPopUp from "./AddPCPopUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DisplaySelection = () => {
  const notification = (message) => toast.success(message);

  const queryClient = useQueryClient();
  const { pcs, setPcs } = useContext(AppContext);
  const [allVideos, setAllVideos] = useState();
  const [selectedPC, setSelectedPC] = useState();
  const [popUp, setPopUp] = useState(false);
  const [addPopUp, setAddPopUp] = useState(false);
  const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const allPCs = useQuery(
    "all-pcs",
    () => fetchData(`http://192.168.178.155:8000/api/all-pcs`)
  );
  const allVids = useQuery("all-videos", () => fetchData(`http://192.168.178.155:8000/api/all-videos`));
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
    gridGap: "10vmin",
    marginTop: "2rem",
  };


  if (isLoading) {
    return (
      <div className="DisplayWrapper">
        <BarLoader loading={isLoading} color={"#00665a"} size={150} />
      </div>);
  }

  if (isError) {
    return (
      <div className="DisplayWrapper">
        <h1>Error</h1>
      </div>);
  }

  return (
    <><ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
      {/* Same as */}
      <ToastContainer />
      {data && !isLoading && !isError && (
        <div className="grid" style={STYLE_WRAPPER}>

          <Card
            sx={{ maxWidth: "150px" }}
            onClick={() => {

              setAddPopUp(true);
            }}
            className="Card"
          >
            <CardContent sx={{ textAlign: "center" }}>
              <GrAdd size={"3em"} />

              <Typography variant="body2" color="text.secondary">
                PC
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hinzufügen
              </Typography>
            </CardContent>
          </Card>
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
