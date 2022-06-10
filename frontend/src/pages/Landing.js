import React, { useContext, useEffect, useState } from 'react'
import AppContext from "../utils/AppContext";
import axios from "axios";
import Cards from "./Card";
import { useNavigate } from "react-router-dom";
import { Grid } from "@material-ui/core";
function Landing() {
    let navigate = useNavigate();
    const { videos, setVideos } = useContext(AppContext);
    const [vids, setVids] = useState([])
    const getVideos = async () => {
        await axios.get('http://127.0.0.1:8000/api/videos').then(resp => {

            setVids(resp.data);

        });
    }


    window.title = "Übersicht"
    useEffect(() => {
        getVideos()
    }, [videos]);
    return (
        <div><h1>Übersicht</h1>

            <Grid container spacing={3}>

                {vids.map((video) => (
                    <Grid item xs={2}> <Cards video={video} /></Grid>
                ))}

            </Grid>


        </div>


    )
}


export default Landing
