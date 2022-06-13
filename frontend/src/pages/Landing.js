import React, { useContext, useEffect ,useCallback,useState } from 'react'
import AppContext from "../utils/AppContext";
import axios from "axios";
import Cards from "./Card";
import { Grid } from "@material-ui/core";
function Landing() {
    const { videos, setVideos } = useContext(AppContext);
    const getVideos = useCallback(async()=>{
        await axios.get('http://127.0.0.1:8000/api/videos').then(resp => {

            setVideos(resp.data);

        });
    },[setVideos])


    document.title = "Übersicht"
    useEffect(() => {
        getVideos()
    }, [getVideos]);
    return (
        <div><h1>Übersicht</h1>

            <Grid container spacing={3}>

                {videos?.map((video) => (
                    <Grid key={video?.id} item xs={2}> <Cards video={video} /></Grid>
                ))}

            </Grid>


        </div>


    )
}


export default Landing
