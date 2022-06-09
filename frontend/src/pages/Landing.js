import React, {useContext, useEffect, useState} from 'react'
import AppContext from "../utils/AppContext";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from "axios";

function Landing() {
  const {videos,setVideos}= useContext(AppContext);
const [vids,setVids] = useState([])
    const getVideos = async()=>{await axios.get('http://127.0.0.1:8000/api/videos').then(resp => {

        console.log(resp.data);
        setVids(resp.data);

    });}
    let link =
    useEffect(()=>{
        getVideos()
    },[videos]);
  return (
    <div>Landing

        <div>
      {vids.map((video)=>(
          <Card sx={{ maxWidth: 345 }} key={video.id}>
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

      ))}
            {vids.map((video)=>(
            <video width="320" height="240" controls>
                <source src={`http://127.0.0.1:8000${video.video}`} type="video/mp4"/>

                Your browser does not support the video tag.
            </video>))}
        </div>


    </div>


  )
}


export default Landing
