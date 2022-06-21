import React, { useContext, useEffect, useCallback,useState } from "react";
import AppContext from "../utils/AppContext";
import axios from "axios";
import Cards from "./Card";
import "../static/css/Landing.css";
function Landing() {
	const [error, setError] = useState(false);
	const { videos, setVideos } = useContext(AppContext);
	const getVideos = useCallback(async () => {
		await axios.get("http://172.16.81.73:8000/api/current-pc-videos").then(resp => {
			setVideos(resp.data);

		}).catch(function(error)  { 
			
			setError(true) });
	}, [setVideos,error.response]);

	document.title = "Übersicht";
	useEffect(() => {
		getVideos();
	}, [getVideos]);
	return (
		<div className="container">
			<h1 className="title" >
				<span className="greenstripe">ENERCON</span>
				<span className="redstripe">Filme</span>
			</h1>

			{error && (<h1>PC nicht freigegeben</h1>)}
			{!error && (<div className="grid">
				{
					videos?.map((video) => (

						<Cards key={video?.id} video={video} />

					))}</div>)}





		</div>


	);
}


export default Landing;
