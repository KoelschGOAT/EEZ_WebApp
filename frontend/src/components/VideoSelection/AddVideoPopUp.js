import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import BarLoader from 'react-spinners/BarLoader';
import '../../static/css/PopUp.css';
import Loader from '../Feedback/Loader';
import Notification from '../Feedback/Notification';
import Modal from '../PopUp/Modal';
const AddVideoPopUp = ({ onClose, allVideos }) => {
  const [inputError, setInputError] = useState({
    error: false,
    message: '',
  });

  const queryClient = useQueryClient();

  const postVideo = useMutation(
    (formData) =>
      axios.post(`http://127.0.0.1:8000/api/all-videos`, formData),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('all-videos');
        onClose();
      },
      onError: () => {
        setInputError({
          ...inputError,
          error: true,
          message: 'Ein unerwarteter Fehler ist augetreten',
        });
      },
    }
  );
  const { register } = useForm();
  const [videoConfig, setVideoConfig] = useState({
    video: [],
    screenshot: [],
    title_de: '',
    title_en: '',
    text_de: '',
    text_en: '',
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setVideoConfig((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onChangeHandlerFile = (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    setVideoConfig((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };
  const onSubmit = (event) => {
    const {
      video,
      screenshot,
      title_de,
      title_en,
      text_de,
      text_en,
    } = videoConfig;
    console.log(videoConfig.video.type, videoConfig.screenshot.type);
    event.preventDefault();
    if (
      video === [] ||
      screenshot === [] ||
      title_de === '' ||
      title_en === '' ||
      text_de === '' ||
      text_en === ''
    ) {
      setInputError({
        ...inputError,
        error: true,
        message: 'Eingabe Felder leer oder zu wenig Ziffern',
      });
      return;
    }
    if (
      video.type === 'video/mp4' ||
      video.type === 'video/webm' ||
      screenshot.type === 'image/png' ||
      screenshot.type === 'image/jpeg' ||
      screenshot.type === 'image/webP'
    ) {
      const formData = new FormData();

      formData.append('video', video);
      formData.append('screenshot', screenshot);
      formData.append('title_de', title_de);
      formData.append('title_en', title_en);
      formData.append('text_de', text_de);
      formData.append('text_en', text_en);

      console.log(formData.values());
      postVideo.mutate(formData);
    } else {
      setInputError({
        ...inputError,
        error: true,
        message:
          'falsches Video/Foto Format, verwende stattdessen MP4, WebM oder jpeg, png, WebP',
      });
    }
  };

  return (
    <>
      <Modal onClose={onClose} title="Neues Video erstellen">
        {inputError.error && (
          <Notification
            width="50%"
            severity="error"
            Title="Fehler"
            Message={inputError.message}
          />
        )}
        <div className="container">
          <form onSubmit={onSubmit}>
            <div className="Form-Checklist-Wrapper">
              <div className="input-Wrapper">
                <div className="row">
                  <div className="col-25">
                    <label className="inputLabel" htmlFor="video">
                      Video
                    </label>
                  </div>
                  <div className="col-75">
                    <input
                      {...register('video', {
                        required: true,
                      })}
                      className="PopUpInput"
                      type="file"
                      name="video"
                      onChange={(e) => onChangeHandlerFile(e)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-25">
                    <label
                      className="inputLabel"
                      htmlFor="screenshot"
                    >
                      Screenshot
                    </label>
                  </div>
                  <div className="col-75">
                    <input
                      {...register('screenshot', {
                        required: true,
                      })}
                      className="PopUpInput"
                      type="file"
                      name="screenshot"
                      onChange={(e) => onChangeHandlerFile(e)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-25">
                    <label className="inputLabel" htmlFor="title_de">
                      Titel DE
                    </label>
                  </div>
                  <div className="col-75">
                    <input
                      {...register('title_de', {
                        required: true,
                      })}
                      className="PopUpInput"
                      type="text"
                      name="title_de"
                      onChange={(e) => onChangeHandler(e)}
                      value={setVideoConfig.title_de}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-25">
                    <label className="inputLabel" htmlFor="title_en">
                      Titel EN
                    </label>
                  </div>
                  <div className="col-75">
                    <input
                      {...register('title_en', {
                        required: true,
                      })}
                      className="PopUpInput"
                      type="text"
                      name="title_en"
                      onChange={(e) => onChangeHandler(e)}
                      value={setVideoConfig.title_en}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-25">
                    <label className="inputLabel" htmlFor="text_de">
                      Text DE
                    </label>
                  </div>
                  <div className="col-75">
                    <textarea
                      {...register('text_de', {
                        required: true,
                      })}
                      className="PopUpInput"
                      type="text"
                      name="text_de"
                      onChange={(e) => onChangeHandler(e)}
                      value={setVideoConfig.text_de}
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label className="inputLabel" htmlFor="text_en">
                      Text EN
                    </label>
                  </div>
                  <div className="col-75">
                    <textarea
                      {...register('text_en', {
                        required: true,
                      })}
                      className="PopUpInput"
                      type="text"
                      name="text_en"
                      onChange={(e) => onChangeHandler(e)}
                      value={setVideoConfig.text_en}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="ButtonBox">
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
            </div>
          </form>
        </div>
      </Modal>
    </>
  );

  //returns portal to render a popUp on the parent div DisplaySelectionPopUp
  /*return ReactDom.createPortal(
    <>
      <div className="OverflowContainer">
        {postVideo.isLoading ? (
          <Loader />
        ) : (
          <div className="PopUpModal">
            {' '}
            <Fab
              onClick={onClose}
              className="close"
              size="medium"
              sx={{
                backgroundColor: '#ff0000',
                '&:hover': {
                  backgroundColor: '#d71313',
                },
              }}
              aria-label="close"
            >
              <CloseIcon />
            </Fab>
            <div className="PopUpHeader">
              <h2>Neues Video</h2>
              <p>Neues Video erstellen</p>
            </div>
            {inputError.error && (
              <Notification
                width="50%"
                severity="error"
                Title="Fehler"
                Message={inputError.message}
              />
            )}
            <div className="container">
              <form onSubmit={onSubmit}>
                <div className="Form-Checklist-Wrapper">
                  <div className="input-Wrapper">
                    <div className="row">
                      <div className="col-25">
                        <label className="inputLabel" htmlFor="video">
                          Video
                        </label>
                      </div>
                      <div className="col-75">
                        <input
                          {...register('video', {
                            required: true,
                          })}
                          className="PopUpInput"
                          type="file"
                          name="video"
                          onChange={(e) => onChangeHandlerFile(e)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-25">
                        <label
                          className="inputLabel"
                          htmlFor="screenshot"
                        >
                          Screenshot
                        </label>
                      </div>
                      <div className="col-75">
                        <input
                          {...register('screenshot', {
                            required: true,
                          })}
                          className="PopUpInput"
                          type="file"
                          name="screenshot"
                          onChange={(e) => onChangeHandlerFile(e)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-25">
                        <label
                          className="inputLabel"
                          htmlFor="title_de"
                        >
                          Titel DE
                        </label>
                      </div>
                      <div className="col-75">
                        <input
                          {...register('title_de', {
                            required: true,
                          })}
                          className="PopUpInput"
                          type="text"
                          name="title_de"
                          onChange={(e) => onChangeHandler(e)}
                          value={setVideoConfig.title_de}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-25">
                        <label
                          className="inputLabel"
                          htmlFor="title_en"
                        >
                          Titel EN
                        </label>
                      </div>
                      <div className="col-75">
                        <input
                          {...register('title_en', {
                            required: true,
                          })}
                          className="PopUpInput"
                          type="text"
                          name="title_en"
                          onChange={(e) => onChangeHandler(e)}
                          value={setVideoConfig.title_en}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-25">
                        <label
                          className="inputLabel"
                          htmlFor="text_de"
                        >
                          Text DE
                        </label>
                      </div>
                      <div className="col-75">
                        <textarea
                          {...register('text_de', {
                            required: true,
                          })}
                          className="PopUpInput"
                          type="text"
                          name="text_de"
                          onChange={(e) => onChangeHandler(e)}
                          value={setVideoConfig.text_de}
                        ></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-25">
                        <label
                          className="inputLabel"
                          htmlFor="text_en"
                        >
                          Text EN
                        </label>
                      </div>
                      <div className="col-75">
                        <textarea
                          {...register('text_en', {
                            required: true,
                          })}
                          className="PopUpInput"
                          type="text"
                          name="text_en"
                          onChange={(e) => onChangeHandler(e)}
                          value={setVideoConfig.text_en}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ButtonBox">
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
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>,
    document.getElementById('DisplaySelectionPopUp')
                  );*/
};

export default AddVideoPopUp;
