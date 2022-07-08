import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "../static/css/AddVideo.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//TODO: video state update after video add, now: redirect after upload to landing page with old data

const AddVideo = () => {
  const [screenshotFile, setScreenshotFile] = useState();
  const [videoFile, setVideoFile] = useState();
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const notification = (message) => toast.success(message);
  const navigate = useNavigate();
  function handleOnChangeVideo(event) {
    setVideoFile(event.target.files[0]);
    notification("Video ausgewält");
  }
  function handleOnChangeScreenshot(event) {
    notification("Screenshot ausgewält");
    setScreenshotFile(event.target.files[0]);
  }
  function handleTitle(event) {
    setTitle(event.target.value);
  }
  function handleSubTitle(event) {
    setSubTitle(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://192.168.3.23:8000/api/videos";
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("screenshot", screenshotFile);
    formData.append("title", title);
    formData.append("subtitle", subTitle);
    axios.post(url, formData).then((response) => {
      console.log(response.data);
    });
    navigate("/");
  }

  return (
    <div className="AddVideoContainer">
      <div className="flexContainer">
        <div className="AddVideo">
          <form onSubmit={handleSubmit}>
            <h1 className="title">Neues Video Hinzufügen</h1>
            <div className="fileWrapper">
              <label className="uploadLabel">
                <input
                  className="fileUpload"
                  type="file"
                  placeholder="Video"
                  onChange={handleOnChangeVideo}
                />

                {videoFile ? videoFile?.name &&"awd": "Upload Video"}
              </label>
              <label className="uploadLabel">
                <input
                  className="fileUpload"
                  type="file"
                  onChange={handleOnChangeScreenshot}
                />
                {screenshotFile ? screenshotFile?.name : "Upload Screenshot"}
              </label>

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
            </div>
            <div className="textWrapper">
              <input
                className="titleUpload"
                name="title"
                onChange={handleTitle}
                placeholder="Titel"
                type="text"
              />

              <input
                placeholder="Untertitel"
                className="subtitleUpload"
                name="subtitle"
                onChange={handleSubTitle}
                type="text"
              />
            </div>
            <div className="btn">
              <button
                className={
                  videoFile && screenshotFile && title && subTitle
                    ? " submitButton Clickable "
                    : "submitButton notClickable"
                }
                type="submit"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddVideo;
