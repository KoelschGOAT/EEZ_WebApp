import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import { useNavigate } from "react-router-dom";

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true,
};
const Slider = ({ Videos }) => {
  console.log(Videos);
  const BUTTON_STYLES = {
    marginTop: "5px",
    width: "145px",
    height: "45px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "hsl(341, 100%, 45%)",
    cursor: "pointer",
    margin: "auto" /* Important */,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    verticalAlign: "middle",
    lineHeight: "250%",
  };
  let navigate = useNavigate();
  return (
    <div className="slide-container">
      <Slide {...zoomOutProperties}>
        {Videos.map((video, index) => (
          <>
            <img
              key={video.id}
              style={{ width: "100%", height: "80%" }}
              src={`http://192.168.178.21:8000${video.screenshot}`}
              alt={video.title_de}
            />
            <button
              onClick={() => {
                navigate("/SingleVideo", { replace: false, state: { video } });
              }}
              style={BUTTON_STYLES}
            >
              Video Abspielen
            </button>
            <span>{video.title_de}</span>
          </>
        ))}
      </Slide>
    </div>
  );
};
export default Slider;
