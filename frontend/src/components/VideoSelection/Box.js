import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
/* export default function Form({ video, onClose }) {
  const [value, setValue] = useState('');
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

  const onChangeHandlerFile = (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    setVideoConfig((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const onChangeHandler = (e) => {
    console.log(e.target);
    e.preventDefault();
    const { name, value } = e.target;
    setVideoConfig((prevState) => ({
      ...prevState,
      [videoConfig.title_de]: e.target.value,
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
    event.preventDefault();
    const formData = new FormData();

    formData.append('video', video);
    formData.append('screenshot', screenshot);
    formData.append('title_de', title_de);
    formData.append('title_en', title_en);
    formData.append('text_de', text_de);
    formData.append('text_en', text_en);
    console.log(formData);
    putVideo.mutate(formData);
  };
  const CustomInputComponent = ({ inputRef, ...rest }) => (
    <input ref={inputRef} {...rest} type="text" />
  );
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
    >
      <div>
        <TextField id="value" label="value" />
      </div>
    </Box>
  );
}*/
import * as React from 'react';
export default function InputComponent({ onClose, video }) {
  const [value, setValue] = useState('');
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

  const onChangeHandlerFile = (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    setVideoConfig((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const onChangeHandler = (e) => {
    console.log(e.target);
    e.preventDefault();
    const { name, value } = e.target;
    setVideoConfig((prevState) => ({
      ...prevState,
      [name]: value,
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
    event.preventDefault();
    const formData = new FormData();

    formData.append('video', video);
    formData.append('screenshot', screenshot);
    formData.append('title_de', title_de);
    formData.append('title_en', title_en);
    formData.append('text_de', text_de);
    formData.append('text_en', text_en);
    console.log(formData);
    putVideo.mutate(formData);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <div>
        <TextField
          name="title_en"
          id="title_en"
          label="title_en"
          value={videoConfig.title_en}
          onChange={onChangeHandler}
        />
      </div>
    </Box>
  );
}
