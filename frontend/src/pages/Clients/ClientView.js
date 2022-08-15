import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import './ClientView.css';
function ClientView({ onClose, title = 'popup Title', children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [video, setVideo] = useState(location.state?.video);
  return ReactDom.createPortal(
    <>
      <div className="client-popup-modal">
        <div className="client-popup-header">
          <div className="client-popup-title">
            Video Einstellungen - {video?.title_de}
          </div>
          <div className="client-close" onClick={() => navigate(-1)}>
            &times;
          </div>
        </div>

        {children}
      </div>
    </>,
    document.getElementById('DisplaySelectionPopUp')
  );
}

export default ClientView;
