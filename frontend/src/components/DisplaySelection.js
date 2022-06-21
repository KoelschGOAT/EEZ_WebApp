import React, { useState, useCallback, useContext, useEffect } from "react";

import { MdMonitor } from "react-icons/md";
import AppContext from "../utils/AppContext";
import { IconContext } from "react-icons";
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
	const [selectedPC, setSelectedPC] = useState();
	const [popUp, setPopUp] = useState(false);
	let navigate = useNavigate();
	const { videos, setVideos, pcs, setPcs } = useContext(AppContext);
	const [error, setError] = useState(false);
	const getPCs = useCallback(async () => {
		await axios.get("http://172.16.81.73:8000/api/all-pcs").then(resp => {

			setPcs(resp.data);


		}).catch(function (error) {

			setError(true)
		});
	}, [setPcs]);
	const STYLE_WRAPPER = {
		width: "100vmax",
		display: "grid",
		gridTemplateColumns: "repeat(3, 400px)",
		gridTemplateRows: "repeat(3)",
		justifyContent: "center",
		gridGap: "3vmin",
		marginTop: "2rem",
	}
	useEffect(() => {
		getPCs();
	}, [getPCs]);
	return (
		<div>
			{!error && (
				<div className="grid" style={STYLE_WRAPPER}>
					{
						pcs?.map((pc) => (

							<div key={pc.id} className="wrapper">
								<Card sx={{ minWidth: "200px" }} onClick={() => { setPopUp(true); setSelectedPC(pc) }} className="Card">

									<CardActionArea>

										<CardContent sx={{ textAlign: "center" }}>
											<img src={screen} alt="PC Logo" />

											<Typography variant="body2" color="text.secondary">
												{pc.pc_name}


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
			<PopUp open={popUp} pc={selectedPC} onClose={() => setPopUp(false)} />
		</div>
	)
}

export default DisplaySelection