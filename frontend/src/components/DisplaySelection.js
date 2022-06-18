import React, { useState, useCallback, useContext, useEffect } from "react";
import { CgScreen } from "react-icons/cg";
import AppContext from "../utils/AppContext"
import screen from "../static/img/screen.svg"
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import PopUp from "./PopUp";
const DisplaySelection = () => {
	const [selectedPC,setSelectedPC] = useState();
	const [popUp,setPopUp]=useState(false);
	let navigate = useNavigate();
	const { videos, setVideos, pcs, setPcs } = useContext(AppContext);
	const [error, setError] = useState(false);
	const getPCs = useCallback(async () => {
		await axios.get("http://192.168.178.21:8000/api/pcs").then(resp => {

			setPcs(resp.data);
			console.log(resp.data)

		}).catch(function (error) {

			setError(true)
		});
	}, [setPcs]);
	useEffect(() => {
		getPCs();
	}, [getPCs]);
	return (
		<div>
			{!error && (
			<div className="grid">
				{
					pcs?.map((pc) => (

						<div key={pc.id}className="wrapper">
							<Card onClick={()=>{setPopUp(true);setSelectedPC(pc)}}className="Card">

								<CardActionArea>

									<CardContent>
										<Typography gutterBottom variant="h6" component="div">
											{pc.name}

										</Typography>
										<Typography variant="body2" color="text.secondary">
											{pc.ip_address}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</div>

					))}
			</div>)
			}
			{popUp ? <PopUp toggle={popUp} pc={selectedPC}/> : null}
		</div>
	)
}

export default DisplaySelection