import React, { useContext, useEffect, useCallback, useState } from 'react'
import {useLocation} from "react-router-dom";
import AppContext from "../utils/AppContext";
import axios from "axios";
import Cards from "./Card";
import { Grid } from '@mui/material';
import { spacing } from '@mui/system';
function Landing() {
    
    const { videos, setVideos } = useContext(AppContext);
    const getVideos = useCallback(async () => {
        await axios.get('http://127.0.0.1:8000/api/videos').then(resp => {

            setVideos(resp.data);

        });
    }, [setVideos])

    document.title = "Übersicht"
    useEffect(() => {
        getVideos()
    }, [getVideos]);
    return (
        <div>
            <h1 className="title" ><span className="greenstripe">ENERCON</span><span className="redstripe">Film</span></h1>

            <Grid container sx={{ ml: "1.5rem", mr: "1.5rem" }} spacing={4.5}>

                {videos?.map((video) => (
                    <Grid key={video?.id} item xs={2} sm={4} md={4}>
                        <Cards video={video} />
                    </Grid>
                ))}

            </Grid>


        </div>


    )
}


export default Landing
