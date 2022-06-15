import React, { useContext, useEffect, useCallback, useState } from 'react'
import { useLocation } from "react-router-dom";
import AppContext from "../utils/AppContext";
import axios from "axios";
import Cards from "./Card";
import { Grid } from '@mui/material';
import { spacing } from '@mui/system';
import "../static/css/Landing.css";
function Landing() {
    console.log(window.location)
    const { videos, setVideos } = useContext(AppContext);
    const getVideos = useCallback(async () => {
        await axios.get('http://172.16.81.73:8000/api/videos').then(resp => {

            setVideos(resp.data);

        });
    }, [setVideos])

    document.title = "Übersicht"
    useEffect(() => {
        getVideos()
    }, [getVideos]);
    return (
        <div className="container">
            <h1 className="title" >
                <span className="greenstripe">ENERCON</span>
                <span className="redstripe">Filme</span>
            </h1>


            <div className="grid">
                {
                videos?.map((video) => (

                    <Cards key={video?.id} video={video} />

                ))}</div>





        </div>


    )
}


export default Landing
