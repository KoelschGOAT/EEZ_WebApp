import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CloseIcon from '@mui/icons-material/Close';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { useStepContext } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import BarLoader from 'react-spinners/BarLoader';
import '../../static/css/PopUp.css';
import Loader from '../Feedback/Loader';
import Notification from '../Feedback/Notification';
import CheckboxList from './CheckboxList';
const AddPCPopUp = ({ onClose, allVideos }) => {
  const queryClient = useQueryClient();

  const postPC = useMutation(
    (formData) =>
      axios.post(`http://127.0.0.1:8000/api/all-pcs`, formData),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('all-pcs');
        onClose();
      },
      onError: () => {
        setInputError(true);
        setInputErrorMessage(
          'Ein unerwarteter Fehler ist augetreten'
        );
      },
    }
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [inputError, setInputError] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState('');
  const [pcName, setPcName] = useState();
  const [ipAddress, setIpAddress] = useState();
  const [pcVideos, setPcVideos] = useState([]);

  const onChangeHandler = (e, setState) => {
    e.preventDefault();
    setState(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = {};

    formData['pc_name'] = pcName;
    formData['ip_address'] = ipAddress;

    formData['Videos'] = pcVideos;
    if (pcName.length <= 4 || ipAddress.length <= 6) {
      setInputError(true);
      setInputErrorMessage(
        'Eingabe Felder leer oder zu wenig Ziffern'
      );
    } else postPC.mutate(formData);
  };

  //returns portal to render a popUp on the parent div DisplaySelectionPopUp
  return ReactDom.createPortal(
    <>
      <div className="OverflowContainer">
        {postPC.isLoading ? (
          <Loader />
        ) : (
          <div className="PopUpModal">
            {' '}
            <Fab
              onClick={onClose}
              className="close"
              size="medium"
              aria-label="close"
            >
              <CloseIcon />
            </Fab>
            <div className="PopUpHeader">
              <h2>Neuen PC hinzufügen</h2>
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
                        <label
                          className="inputLabel"
                          htmlFor="pc_name"
                        >
                          PC Name
                        </label>
                      </div>
                      <div className="col-75">
                        <input
                          {...register('pcName', {
                            required: true,
                            maxLength: 40,
                          })}
                          className="PopUpInput"
                          type="text"
                          name="pc_name"
                          onChange={(e) =>
                            onChangeHandler(e, setPcName)
                          }
                          value={pcName}
                          placeholder="PC Name"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-25">
                        <label
                          className="inputLabel"
                          htmlFor="ipAddress"
                        >
                          IP Adresse
                        </label>
                      </div>
                      <div className="col-75">
                        <input
                          {...register('pcIpaddress', {
                            required: true,
                            pattern:
                              '/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/',
                          })}
                          className="PopUpInput"
                          type="text"
                          name="ip_address"
                          onChange={(e) =>
                            onChangeHandler(e, setIpAddress)
                          }
                          value={ipAddress}
                          placeholder="IP-Adresse"
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
                <Button
                  sx={[
                    {
                      backgroundColor: '#04a96d',
                      '&:hover': {
                        backgroundColor: '#2e6b31',
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
              </form>
            </div>
          </div>
        )}
      </div>
    </>,
    document.getElementById('DisplaySelectionPopUp')
  );
};

export default AddPCPopUp;
