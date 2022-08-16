import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalView from './ModalView';
import ClientForm from './ClientForm';
function ClientView({ onClose, pc }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <ModalView
        onClose={onClose}
        title={`Client Einstellungen - ${pc?.pc_name}`}
      >
        <ClientForm pc={pc} />
      </ModalView>
    </>
  );
}

export default ClientView;
