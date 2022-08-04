import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import "../../static/css/PopUp.css";
import BarLoader from "react-spinners/BarLoader";
import Fab from "@mui/material/Fab";
import CloseIcon from '@mui/icons-material/Close';
import CheckboxList from "./CheckboxList";
import axios from "axios";
import SnackbarNoti from "../Feedback/SnackbarNoti";
import Notification from "../Feedback/Notification";
import Loader from "../Feedback/Loader";
import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery, useMutation, useQueryClient } from "react-query";
const PopUp = ({ pc, onClose, allVideos, setNoti }) => {
  const [pcName, setPcName] = useState(pc.pc_name);
  const [ipAddress, setIpAddress] = useState(pc.ip_address);
  const [pcVideos, setPcVideos] = useState(pc.Videos);
  const [inputError, setInputError] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const putPC = useMutation(
    (formData) =>
      axios.patch(`http://127.0.0.1:8000/api/pc/${pc.id}`, formData),
    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries("all-pcs");
        onClose();
      },
      onError: () => {
        setInputError(true);
        setInputErrorMessage("Ein unerwarteter Fehler ist augetreten");
        console.log("error");
      },
    }
  );
  const deletePC = useMutation(
    () => axios.delete(`http://127.0.0.1:8000/api/pc/${pc.id}`),

    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("all-pcs");

        onClose();
      },
      onError: () => {
        setInputError(true);
        setInputErrorMessage("Ein unerwarteter Fehler ist augetreten");
        console.log("error");
      },
    }
  );
  const isLoading = putPC.isLoading||deletePC.isLoading;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onChangeHandler = (e, setState) => {
    e.preventDefault();
    setState(e.target.value);
  };

  const onDeleteHandler = () => {
    deletePC.mutate();
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = {};

    formData["pc_name"] = pcName;
    formData["ip_address"] = ipAddress;

    formData["Videos"] = pcVideos;
    if (pcName.length <= 4 || ipAddress.length <= 6) {
      setInputError(true);
      setInputErrorMessage("Eingabe Felder leer oder zu wenig Ziffern");
    } else if (
      ipAddress.match(
        "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
      ) == null
    ) {
      setInputError(true);
      setInputErrorMessage("IP Adresse entspricht nicht der Norm");
    } else putPC.mutate(formData);
  };

  //returns portal to render a popUp on the parent div DisplaySelectionPopUp
  return ReactDom.createPortal(
    <>
      <div className="OverflowContainer">
        {isLoading ? (
        
            <Loader loading={isLoading}/>
           
          
        ) : (
          <div className="PopUpModal">
            {" "}
            <Fab onClick={onClose}className="close" size="medium" sx={{backgroundColor:"#ff0000", "&:hover": {
                        backgroundColor: "#d71313",
                      },}} aria-label="close">
              <CloseIcon />
            </Fab>
            <div className="PopUpHeader">
              <h2>{pc.pc_name}</h2>
              <p>Einstellungen für {pc.pc_name}</p>
            </div>
            {inputError && (
              <Notification
                width="50%"
                severity="error"
                Title="Fehler"
                Message={inputErrorMessage}
              />
            )}
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
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                  {/* Same as */}
                  <ToastContainer />
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
                    onClick={() => onDeleteHandler()}
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
        )}
      </div>
    </>,
    document.getElementById("DisplaySelectionPopUp")
  );
};

export default PopUp;
