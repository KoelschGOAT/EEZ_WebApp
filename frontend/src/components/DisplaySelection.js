import React,{useState,useCallback, useContext,useEffect} from "react";
import {CgScreen} from "react-icons/cg";
import AppContext from "../utils/AppContext"
import screen from "../static/img/screen.svg"
import axios from "axios";
const DisplaySelection= () => {
  const { videos, setVideos,pcs,setPcs } = useContext(AppContext);
  const [error,setError]= useState(false);
	const getPCs = useCallback(async () => {
		await axios.get("http://192.168.178.21:8000/api/pcs").then(resp => {

			setVideos(resp.data);

		}).catch(function(error)  { 
			
			setError(true) });
	}, [setVideos]);
  useEffect(() => {
		getPCs();
	}, [getPCs]);
  return (
    <div><div>{JSON.stringify(videos,2,0)}</div></div>
  )
}

export default DisplaySelection