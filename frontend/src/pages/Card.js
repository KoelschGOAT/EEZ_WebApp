import React, { useContext, useEffect, useState } from 'react'
import AppContext from "../utils/AppContext";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Grid} from "@material-ui/core";
const Cards = ({video}) => {
    let navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }} key={video.id} onClick={()=>{navigate("/SingleVideo", { replace: false, state: { video } })}}>
    <CardActionArea>
        <CardMedia
            component="img"
            height="140"
            image={`http://127.0.0.1:8000${video.screenshot}`}
            alt="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {video.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {video.subtitle}
            </Typography>
        </CardContent>
    </CardActionArea>
</Card>

  )
}

export default Cards