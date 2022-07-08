import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import "../../static/css/PopUp.css";
import CheckboxList from "./CheckboxList";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useForm } from "react-hook-form";

import { useQuery, useMutation, useQueryClient } from "react-query";
const PopUp = ({ pc, onClose, allVideos, getPCs }) => {
  const queryClient = useQueryClient();

  const putPC = useMutation(
    (formData) =>
      axios.put(`http://192.168.3.23:8000/api/pc/${pc.id}`, formData),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("all-pcs");
        onClose();
      },
    }
  );
  const deletePC = useMutation(
    () =>
      axios.delete(`http://192.168.3.23:8000/api/pc/${pc.id}`),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("all-pcs");
        onClose();
      },
    }
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [pcName, setPcName] = useState(pc.pc_name);
  const [ipAddress, setIpAddress] = useState(pc.ip_address);
  const [pcVideos, setPcVideos] = useState(pc.Videos);

  const onChangeHandler = (e, setState) => {
    e.preventDefault();
    setState(e.target.value);
  };
  const onDeleteHandler=(e)=>{
    deletePC.mutate();
  }
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = {};

    formData["pc_name"] = pcName;
    formData["ip_address"] = ipAddress;


    let videoArray = [];
    pcVideos.forEach((video) => {
      if (video.id) {
        videoArray.push(video.id);
      }
    });
    formData["Videos"] = videoArray;

    putPC.mutate(formData);
  };

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
                        {...register("pcName", {
                          required: true,
                          maxLength: 40,
                        })}
                        className="PopUpInput"
                        type="text"
                        name="pc_name"
                        onChange={(e) => onChangeHandler(e, setPcName)}
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
                        onChange={(e) => onChangeHandler(e, setIpAddress)}
                        value={ipAddress}
                      />
                    </div>
                  </div>
                </div>

                <CheckboxList
                  pcVideos={pcVideos}
                  setPcVideos={setPcVideos}
                  allVideos={allVideos}
                />
              </div>
              <div className="ButtonBox">
                <Button
                  sx={[
                    {
                      backgroundColor: "#04a96d",
                      "&:hover": {
                        backgroundColor: "#2e6b31",
                      },
                    },
                  ]}
                  className="submitButton"
                  type="submit"
                  value="Submit"
                  variant="contained"
                >
                  Absenden
                </Button>
                <Button
                  onClick={() => onDeleteHandler}
                  sx={[
                    {
                      color: "red",
                      borderColor: "white",
                      "&:hover": {
                        borderColor: "red",
                      },
                    },
                  ]}
                  variant="outlined"
                  className="DeleteButton"
                >
                  Löschen
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("DisplaySelectionPopUp")
  );
};

export default PopUp;
