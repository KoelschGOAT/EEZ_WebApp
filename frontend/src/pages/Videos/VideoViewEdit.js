import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import ButtonLoader from '../../components/Feedback/ButtonLoader';
import Notification from '../../components/Feedback/Notification';
import {
  useDeleteVideos,
  usePatchVideos,
} from '../../services/RequestVideos';
import ModalView from '../Clients/ModalView';
export default function VideoViewEdit({ onClose, video }) {
  const [videoConfig, setVideoConfig] = useState({
    id: video.id,
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
  const handleSuccess = () => {
    setInputError({ ...inputError, error: false });
    setTimeout(() => onClose(), 1000);
  };
  const handleError = () => {
    setInputError({
      error: true,
      message: 'Ein unerwarteter Fehler ist augetreten',
    });
  };
  const updateVideos = usePatchVideos({
    onClose: onClose,
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });
  const deleteVideos = useDeleteVideos({
    onClose: onClose,
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
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

  const onDeleteHandler = () => {
    deleteVideos.mutate({});
  };

  const onSubmit = (event) => {
    setInputError({ error: false, message: '' });
    const {
      id,
      video,
      screenshot,
      title_de,
      title_en,
      text_de,
      text_en,
    } = videoConfig;
    event.preventDefault();

    const formData = new FormData();

    formData.append('video', video);
    formData.append('screenshot', screenshot);
    formData.append('title_de', title_de);
    formData.append('title_en', title_en);
    formData.append('text_de', text_de);
    formData.append('text_en', text_en);

    if (
      video.length === 0 ||
      screenshot.length === 0 ||
      title_de.length === 0 ||
      title_en.length === 0 ||
      text_de.length === 0 ||
      text_en.length === 0
    ) {
      setInputError({
        ...inputError,
        error: true,
        message: 'Eingabe Felder leer oder zu wenig Ziffern',
      });
    } /* else if (
      video.type !== 'video/mp4' ||
      video.type !== 'video/webm' ||
      screenshot.type !== 'image/png' ||
      screenshot.type !== 'image/jpeg' ||
      screenshot.type !== 'image/webP'
    ) {
      console.log(formDataa, formData);
      setInputError({
        ...inputError,
        error: true,
        message: 'Video oder Screenshot nicht im richtigem Format',
      });
    } */ else
      updateVideos.mutate({
        videoId: id,
        formData,
      });
  };

  return (
    <>
      <ModalView
        onClose={onClose}
        title={`Video Einstellungen - ${video?.title_de}`}
      >
        {inputError.error && (
          <Notification
            width="50%"
            severity="error"
            Title="Fehler"
            Message={inputError.message}
          />
        )}
        <form onSubmit={onSubmit}>
          <div className="form-container">
            <div className="form-wrapper">
              <div className="input-wrapper">
                {' '}
                <Button variant="contained" component="label">
                  {videoConfig.video?.name ? (
                    <CheckCircleOutlineIcon />
                  ) : null}
                  {videoConfig.video?.name
                    ? videoConfig.video?.name
                    : 'Upload Video'}
                  <input
                    hidden
                    accept="video/*"
                    type="file"
                    name="video"
                    onChange={(e) => onChangeHandlerFile(e)}
                  />
                </Button>
                <Button variant="contained" component="label">
                  {videoConfig.screenshot?.name ? (
                    <CheckCircleOutlineIcon />
                  ) : null}
                  {videoConfig.screenshot?.name
                    ? videoConfig.screenshot?.name
                    : 'Upload Image'}

                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    name="screenshot"
                    onChange={(e) => onChangeHandlerFile(e)}
                  />
                </Button>{' '}
                <TextField
                  size="large"
                  id="title_de"
                  label="Deutscher Titel"
                  variant="outlined"
                  name="title_de"
                  onChange={(e) => onChangeHandler(e)}
                  value={videoConfig.title_de}
                />
                <TextField
                  size="large"
                  id="title_de"
                  label="Deutscher Titel"
                  variant="outlined"
                  name="title_en"
                  onChange={(e) => onChangeHandler(e)}
                  value={videoConfig.title_en}
                />
                <TextField
                  size="large"
                  id="title_de"
                  label="Deutscher Titel"
                  variant="outlined"
                  name="text_de"
                  onChange={(e) => onChangeHandler(e)}
                  value={videoConfig.text_de}
                />
                <TextField
                  size="large"
                  id="title_de"
                  label="Deutscher Titel"
                  variant="outlined"
                  name="text_en"
                  onChange={(e) => onChangeHandler(e)}
                  value={videoConfig.text_en}
                />
              </div>
              <div className="button-wrapper">
                <ButtonLoader
                  text="Änderung speichern"
                  sx={{ height: '3rem', color: '#fff' }}
                  onClick={onSubmit}
                  isLoading={updateVideos.isLoading}
                  isSuccess={updateVideos.isSuccess}
                  icon={<EditIcon />}
                />
                <ButtonLoader
                  text="Löschen"
                  variant="outlined"
                  color="buttonRed"
                  sx={{ height: '3rem', color: '#000' }}
                  icon={<DeleteIcon />}
                  onClick={onDeleteHandler}
                  isLoading={deleteVideos.isLoading}
                  isSuccess={deleteVideos.isSuccess}
                />
              </div>
            </div>
          </div>
        </form>
      </ModalView>
    </>
  );
}
