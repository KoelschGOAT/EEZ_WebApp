import React, { useState } from "react";
import ReactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import "../../static/css/PopUp.css";
import CheckboxList from "./CheckboxList";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useForm } from "react-hook-form";
import {useQuery} from "react-query";
const PopUp = ({ pc, onClose, allVideos ,getPCs}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const [pcName, setPcName] = useState(pc.pc_name);
  const [ipAddress, setIpAddress] = useState(pc.ip_address);
  const [pcVideos, setPcVideos] = useState(pc.Videos);
  const [pcIsActive, setIsActive] = useState(pc.is_active);
  const [isExhibition, setIsExhibition] = useState(pc.is_exhibition);

  const onChangeHandlerName = (e) => {
    e.preventDefault();
    setPcName(e.target.value);
  };
  const onChangeHandlerIP = (e) => {
    e.preventDefault();
    setIpAddress(e.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const formData ={};
    
    formData["pc_name"] = pcName;
    formData["ip_address"] = ipAddress;
    formData["is_exhibition"] = isExhibition;
    formData["is_active"] = pcIsActive;
    formData["Videos"] = pcVideos;
    console.log(formData);
    
    axios.put(`http://192.168.178.21:8000/api/pc/${pc.id}`,formData).then((response) => {
      pc=response.data;
      getPCs();
      onClose();
    })
  }

  //returns portal to render a popUp on the parent div DisplaySelectionPopUp
  return ReactDom.createPortal(
    <>
      <div className="OverflowContainer">
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
            <form onSubmit={onSubmit}>
              <div className="Form-Checklist-Wrapper">
                <div className="input-Wrapper">
                  <div className="row">
                    <div className="col-25">
                      <label className="inputLabel" htmlFor="pc_name">
                        PC Name
                      </label>
                    </div>
                    <div className="col-75">
                      <input
                        {...register("pcName", { required: true,maxLength:40 })}
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
                      <label className="inputLabel" htmlFor="ipAddress">
                        IP Adresse
                      </label>
                    </div>
                    <div className="col-75">
                      <input
                        {...register("pcIpaddress", {
                          required: true,
                          pattern:
                            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                        })}
                        className="PopUpInput"
                        type="text"
                        name="ip_address"
                        onChange={(e) => onChangeHandlerIP(e)}
                        value={ipAddress}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-75">
                      <FormGroup sx={{ float: "left", marginLeft: "-1rem" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...register("is_active")}
                              defaultChecked={pcIsActive ? true : false}
                            />
                          }
                          label="Aktiv:"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                             
                              defaultChecked={isExhibition ? true : false}
                            />
                          }
                          label="EEZ:"
                          labelPlacement="start"
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>

                <CheckboxList
                  pcVideos={pcVideos}
                  setPcVideos={setPcVideos}
                  allVideos={allVideos}
                />
              </div>
              <input className="submitButton" type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("DisplaySelectionPopUp")
  );
};

export default PopUp;
