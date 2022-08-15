import React, { Children } from 'react';
import ReactDom from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import Show from '../ConditionalRendering/Show';
import './Modal.css';
function Modal({ onClose, title = 'popup Title', children }) {
  /** React.useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]); */
  return ReactDom.createPortal(
    <>
      <div className="overflow-container" onClick={(e) => onClose()}>
        <div
          className="popup-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="popup-header">
            <div className="popup-title">{title}</div>
            <div className="close" onClick={() => onClose()}>
              &times;
            </div>
          </div>

          {children}
        </div>
      </div>
    </>,
    document.getElementById('DisplaySelectionPopUp')
  );
}

export default Modal;
