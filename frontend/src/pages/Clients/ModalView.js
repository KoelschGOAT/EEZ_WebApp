import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './ClientView.css';

function ModalView({ onClose, title = 'Title', children }) {
  const location = useLocation();
  const navigate = useNavigate();

  return ReactDom.createPortal(
    <>
      <div className="client-popup-modal">
        <div className="client-popup-header">
          <div className="client-popup-title">{title}</div>
          <Button className="client-close" onClick={onClose}>
            &times;
          </Button>
        </div>
        {/* Rendering child components aka input fields */}
        {children}
      </div>
    </>,
    document.getElementById('DisplaySelectionPopUp')
  );
}

export default ModalView;
