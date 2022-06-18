import React, { useState } from 'react';
import "../static/css/PopUp.css"
import axios from "axios";
const PopUp = ({ pc }) => {
    const [pcName, setPcName] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const onChangeHandlerName = (e) => {
        setPcName(e.target.value)
    }
    const onChangeHandlerIP = (e) => {
        setIpAddress(e.target.value)
    }
    const handleSubmit=(event)=> {
        event.preventDefault();
		const url = "http://192.168.178.21:8000/api/pc";
		const formData = new FormData();
		formData.append("pc_name", pcName);
		formData.append("ip_address", ipAddress);
		axios.post(url, formData).then((response) => {
			console.log(response.data);
		});
		
	
    }
    return (
        <div><h2>{pc.pc_name}</h2>
            <p>Einstellungen für {pc.pc_name}</p>

            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="pc_name">PC Name</label>
                        </div>
                        <div className="col-75">
                            <input type="text" name="pc_name" onChange={(e) => onChangeHandlerName(e)} defaultValue={pc.pc_name} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="">IP Adresse</label>
                        </div>
                        <div className="col-75">
                            <input type="text" name="ip_address" onChange={(e) => onChangeHandlerIP(e)} defaultValue={pc.ip_address} pattern="^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="country">Videos</label>
                        </div>
                        <div className="col-75">
                            <select id="country" name="country">
                                {pc.Videos?.map((video) => (

                                <option value={video.id}>{video.title}</option>

                                ))}
                               
                            </select>
                        </div>
                    </div>
                    
                    <br />
                    <div className="row">
                        <input className="submitButton" type="submit" value="Submit" />
                    </div>
                </form >
            </div >
        </div >
    )
}

export default PopUp