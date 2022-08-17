import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CloseIcon from '@mui/icons-material/Close';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Feedback/Loader';
import Notification from '../Feedback/Notification';
import Modal from '../PopUp/Modal';

const EditVideoPopUp = ({ video, onClose }) => {
  const [videoLink, setVideoLink] = useState(video.video);
  const [screenshot, setScreenshot] = useState(video.screenshot);
  const [title_de, setTitle_de] = useState(video.title_de);
  const [title_en, setTitle_en] = useState(video.title_en);
  const [text_de, setText_de] = useState(video.text_de);
  const [text_en, setText_en] = useState(video.text_en);
  const [videoConfig, setVideoConfig] = useState({
    video: video.video,
    screenshot: video.screenshot,
    title_de: video.title_de,
    title_en: video.title_en,
    text_de: video.text_de,
    text_en: video.text_en,
  });
  const [inputError, setInputError] = useState({
    error: false,
    message: '',
  });

  const queryClient = useQueryClient();

  const putVideo = useMutation(
    (formData) =>
      axios.put(
        `http://127.0.0.1:8000/api/video/${video.id}`,
        formData
      ),
    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries('all-videos');
        onClose();
      },
      onError: (err) => {
        setInputError({
          ...inputError,
          error: true,
          message: 'Ein unerwarteter Fehler ist augetreten',
        });
      },
    }
  );

  const deleteVideo = useMutation(
    (formData) =>
      axios.delete(`http://127.0.0.1:8000/api/video/${video.id}`),
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
  const onChangeHandlerFile = (e, setState) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setState(e.target.files[0]);
  };

  const onDeleteHandler = () => {
    deleteVideo.mutate();
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('video', videoLink);
    formData.append('screenshot', screenshot);
    formData.append('title_de', title_de);
    formData.append('title_en', title_en);
    formData.append('text_de', text_de);
    formData.append('text_en', text_en);
    console.log(formData);
    putVideo.mutate(formData);
  };

  //returns portal to render a popUp on the parent div DisplaySelectionPopUp
  return (
    <>
      {putVideo.isLoading ? (
        <Loader loading={putVideo.isLoading} />
      ) : (
        <Modal
          onClose={onClose}
          title={`${video.title_de} bearbeiten`}
        >
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
                      onChange={(e) =>
                        onChangeHandlerFile(e, setVideoLink)
                      }
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
                      onChange={(e) =>
                        onChangeHandlerFile(e, setScreenshot)
                      }
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
                      onChange={(e) =>
                        onChangeHandler(e, setTitle_de)
                      }
                      value={title_de}
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
                      onChange={(e) =>
                        onChangeHandler(e, setTitle_en)
                      }
                      value={title_en}
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
                      onChange={(e) => onChangeHandler(e, setText_de)}
                      value={text_de}
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
                      onChange={(e) => onChangeHandler(e, setText_en)}
                      value={text_en}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="ButtonBox">
                <Button
                  sx={[
                    {
                      backgroundColor: '#4c9078;',
                      '&:hover': {
                        backgroundColor: '#669995',
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
                      color: 'red',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'red',
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
        </Modal>
      )}
    </>
  );
};

export default EditVideoPopUp;
