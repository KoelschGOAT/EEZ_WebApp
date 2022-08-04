import React, { useContext, useEffect, useCallback, useState } from "react";
import Alert from "@mui/material/Alert";

import EditVideoPopUp from "./EditVideoPopUp";
import { GrAdd } from "react-icons/gr";
import AddVideoPopUp from "./AddVideoPopUp";
import "react-slideshow-image/dist/styles.css";
import AppContext from "../../utils/Context/AppContext";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Cards from "../../components/Card";
import "../../static/css/Landing.css";
import Loader from "../Feedback/Loader";
import { useQuery, useQueryClient } from "react-query";
function VideoSelection() {
  const [selectedVideo, setSelectedVideo] = useState();
  const [popUp, setPopUp] = useState(false);
  const [addPopUp, setAddPopUp] = useState(false);
  const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data, isError, isLoading, error } = useQuery("all-videos", () =>
    fetchData(`http://127.0.0.1:8000/api/all-videos`)
  );

  const responseReturn = () => {
    <Loader loading={isLoading} />;
    if (isError) {
      return (
        <Alert className="loading" severity="error">
          Ein unerwarteter Fehler ist aufgetreten
        </Alert>
      );
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="title">
          <span className="greenstripe">Einstellungen</span>
          <span className="redstripe">Videos</span>
        </h1>
        {responseReturn()}

        {data && (
          <div className="grid">
            <div className="wrapper">
              <Card
               sx={{ width: "100%" }}
                variant="outlined"
                onClick={() => {
                  setAddPopUp(true);
                }}
                className="Card"
              >
                <CardContent
                  sx={{ textAlign: "center", justifyContent: "center" }}
                >
                  <GrAdd size={"3em"} />

                  <Typography variant="body2" color="text.secondary">
                    <h1>Video
                    <br />
                    erstellen</h1>
                    
                  </Typography>
                </CardContent>
              </Card>
            </div>
            {data?.map((video) => (
              <Cards
                onClick={() => {
                  setSelectedVideo(video);
                  setPopUp(true);
                }}
                key={video?.id}
                video={video}
              />
            ))}
          </div>
        )}
      </div>
      {popUp ? (
        <EditVideoPopUp
          video={selectedVideo}
          open={popUp}
          onClose={() => {
            setPopUp(false);
          }}
        />
      ) : null}
      {addPopUp ? (
        <AddVideoPopUp
          open={addPopUp}
          onClose={() => {
            setAddPopUp(false);
          }}
        />
      ) : null}
    </>
  );
}

export default VideoSelection;
