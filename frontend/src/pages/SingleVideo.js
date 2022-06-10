import React,{useState,useEffect} from 'react'; 
import "../static/css/SingleVideo.css"
import { useNavigate, useLocation } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
const SingleVideo = () => {
    const location = useLocation();
    
    
    return (
        <div>
           
            <div>
                <video className="video"width="420" height="340"  autoPlay   >
                    <source src={`http://127.0.0.1:8000${location.state?.video.video}`} type="video/webm" />


                </video></div> 
               {/*  <div>
                
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="iframe"
                                height="140"
                                image={vid}
                                alt="green iguana"
                                allow="autoplay"
                                
                                type="video/webm"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {location.state.video.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {location.state.video.subtitle}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

               
               
            </div> */}
            
        </div>
    )
}

export default SingleVideo