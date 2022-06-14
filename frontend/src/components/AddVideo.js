import React, { useState } from 'react'
import "../static/css/AddVideo.css";
import axios from 'axios';
const AddVideo = () => {





  const [screenshotFile, setScreenshotFile] = useState()
  const [videoFile, setVideoFile] = useState()
  const [title,setTitle]=useState();
  const [subTitle,setSubTitle]=useState();

  function handleOnChangeVideo(event) {

    setVideoFile(event.target.files[0])
  }
  function handleOnChangeScreenshot(event) {
    
    setScreenshotFile(event.target.files[0])
  }
  function handleTitle(event){
    setTitle(event.target.value)
  }
  function handleSubTitle(event){
    setSubTitle(event.target.value)

    
  }
  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://192.168.178.21:8000/api/videos';
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('screenshot', screenshotFile);
    formData.append('title',title)
    formData.append('subtitle',subTitle)
    
    axios.post(url, formData).then((response) => {
      console.log(response.data);
    });

  }

  return (
    <div className="AddVideo">
      <form onSubmit={handleSubmit}>
        <h1>React File Upload</h1>
        <input type="file" placeholder="Video"onChange={handleOnChangeVideo} />
        <input type="file" onChange={handleOnChangeScreenshot} />
        <input name="title" placeholder="Titel"onChange={handleTitle}type="text" />
        <input name="subtitle" placeholder="Untertitel"onChange={handleSubTitle}type="text"/>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
export default AddVideo;