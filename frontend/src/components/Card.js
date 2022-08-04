import React from "react";
import PropTypes from "prop-types";
import "../static/css/Card.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Cards = ({ video ,onClick}) => {
	
	
	return (
		<div className="wrapper">
			<Card className="Card"
				onClick={onClick}>
				
					<CardMedia
						component="img"
                   
						image={`http://127.0.0.1:8000${video.screenshot}`}
						alt={video.title}
						
					/>
					<CardContent>
						<Typography  gutterBottom variant="h6" component="div">
							{"Titel Deutsch: "+video.title_de}
                        
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{"Titel Englisch: "+video.title_en}
						</Typography>
					</CardContent>
				
			</Card>
		</div>
	);
};
Cards.propTypes={
	video: PropTypes.object.isRequired,
	

};

export default Cards;

