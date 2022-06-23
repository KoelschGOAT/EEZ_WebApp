import React, { useState } from "react";
import ReactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import "../static/css/PopUp.css";
import axios from "axios";
const PopUp = ({ pc, open, onClose }) => {
  const [pcName, setPcName] = useState(pc.pc_name);
  const [ipAddress, setIpAddress] = useState(pc.ip_address);
  const onChangeHandlerName = (e) => {
    e.preventDefault();
    setPcName(e.target.value);
  };
  const onChangeHandlerIP = (e) => {
    e.preventDefault();
    setIpAddress(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "http://192.168.178.21:8000/api/pc/" + pc.id;
    const formData = new FormData();
    formData.append("pc_name", pcName === "" ? pc.pc_name : pcName);
    formData.append("ip_address", ipAddress === "" ? pc.ip_address : ipAddress);
    formData.append("is_active", pc.is_active);

    axios.put(url, formData).then((response) => {
      console.log(response.data);
    });
  };

 
  //returns portal to render a popUp on the parent div DisplaySelectionPopUp
  return ReactDom.createPortal(
    <div className="OverflowContainer">
      <h1></h1>
      <div className="PopUpModal">
        {" "}
        <span className="close" onClick={onClose}>
          {<AiOutlineClose />}
        </span>
        <div className="PopUpHeader">
          <h2>{pc.pc_name}</h2>
          <p>Einstellungen für {pc.pc_name}</p>
        </div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-25">
                <label className="inputLabel" htmlFor="pc_name">
                  PC Name
                </label>
              </div>
              <div className="col-75">
                <input
                  className="PopUpInput"
                  type="text"
                  name="pc_name"
                  onChange={(e) => onChangeHandlerName(e)}
                  value={pcName}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label className="inputLabel" htmlFor="">
                  IP Adresse
                </label>
              </div>
              <div className="col-75">
                <input
                  className="PopUpInput"
                  type="text"
                  name="ip_address"
                  onChange={(e) => onChangeHandlerIP(e)}
                  value={ipAddress}
                  pattern="^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label className="inputLabel" htmlFor="country">
                  Videos
                </label>
              </div>
              <div className="col-75">
                <select id="country" name="country">
                  {pc.Videos?.map((video) => (
                    <option key={video.id} value={video.id}>
                      {video.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row"></div>
            </div>
            <br />{" "}
            <input className="submitButton" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("DisplaySelectionPopUp")
  );
};

export default PopUp;
