import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import './ClientView.css';

function ModalView({ onClose, title = 'Title', children }) {
  console.log(onClose);
  const location = useLocation();
  const navigate = useNavigate();

  return ReactDom.createPortal(
    <>
      <div className="client-popup-modal">
        <div className="client-popup-header">
          <div className="client-popup-title">{title}</div>
          <div className="client-close" onClick={onClose}>
            &times;
          </div>
        </div>
        {/* Rendering child components aka input fields */}
        {children}
      </div>
    </>,
    document.getElementById('DisplaySelectionPopUp')
  );
}

export default ModalView;
