import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import CheckboxList from '../../components/DisplaySelection/CheckboxList';
import ButtonLoader from '../../components/Feedback/ButtonLoader';
import Notification from '../../components/Feedback/Notification';
import MuiAccordion from '../../components/Mui/Accordion';
import { usePatchClients } from '../../services/RequestClients';
import ModalView from './ModalView';
function ClientView({ onClose, pc, allVideos, setNoti }) {
  console.log(pc);

  const [pcId, setPcId] = useState(pc?.id);
  const [pcName, setPcName] = useState(pc?.pc_name || '');
  const [ipAddress, setIpAddress] = useState(pc?.ip_address || '');
  const [pcVideos, setPcVideos] = useState(pc?.Videos || []);
  const [inputError, setInputError] = useState({
    error: false,
    message: '',
  });
  const updateClients = usePatchClients({
    onClose: onClose,
  });
  const queryClient = useQueryClient();

  const deletePC = useMutation(
    () => axios.delete(`http://127.0.0.1:8000/api/pc/${pc.id}`),

    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('all-pcs');
        setTimeout(() => onClose(), 1000);
      },
      onError: () => {
        setInputError({
          error: true,
          message: 'Ein unerwarteter Fehler ist augetreten',
        });
        console.log('error');
      },
    }
  );

  const onChangeHandler = (e, setState) => {
    e.preventDefault();
    setState(e.target.value);
  };

  const onDeleteHandler = () => {
    deletePC.mutate();
  };
  const onSubmit = (event) => {
    console.log(pcId);
    event.preventDefault();
    const formData = {};

    formData['pc_name'] = pcName;
    formData['ip_address'] = ipAddress;

    formData['Videos'] = pcVideos;
    if (pcName.length <= 4) {
      setInputError({
        error: true,
        message: 'PC Name zu leer oder kurz',
      });
    } else if (
      ipAddress.match(
        '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
      ) == null
    ) {
      setInputError({
        error: true,
        message: 'IP Adresse entspricht nicht der Norm',
      });
    } else
      updateClients.mutate({
        pcId,

        formData,
      });
    /* updateClient.onSuccess(() => setTimeout(() => onClose(), 1000));
    updateClient.onError(() =>
      setInputError({
        error: true,
        message: 'Ein Fehler ist aufgetreten',
      })
    ); */
  };

  return (
    <>
      <ModalView
        onClose={onClose}
        title={`Client Einstellungen - ${pc?.pc_name}`}
      >
        {inputError && (
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
                <TextField
                  size="large"
                  id="pcName"
                  label="PC Name"
                  variant="outlined"
                  value={pcName}
                  onChange={(e) => onChangeHandler(e, setPcName)}
                  sx={{ fontSize: ' 5rem' }}
                />
                <TextField
                  size="large"
                  id="ipAddress"
                  label="IP Adresse"
                  variant="outlined"
                  value={ipAddress}
                  onChange={(e) => onChangeHandler(e, setIpAddress)}
                />
                <MuiAccordion
                  title="Videos"
                  subtitle="Wählen Sie aus allen Videos"
                >
                  <CheckboxList
                    pcVideos={pcVideos}
                    setPcVideos={setPcVideos}
                    allVideos={allVideos}
                  />{' '}
                </MuiAccordion>
              </div>
              <div className="button-wrapper">
                <ButtonLoader
                  text="Änderung speichern"
                  sx={{ height: '3rem', color: '#fff' }}
                  onClick={onSubmit}
                  isLoading={updateClients.isLoading}
                  isSuccess={updateClients.isSuccess}
                  icon={<EditIcon />}
                />
                <ButtonLoader
                  text="Löschen"
                  variant="outlined"
                  textSuccess="Gelöscht"
                  color="buttonRed"
                  sx={{ height: '3rem', color: '#000' }}
                  icon={<DeleteIcon />}
                  onClick={onDeleteHandler}
                  isLoading={deletePC.isLoading}
                  isSuccess={deletePC.isSuccess}
                />
              </div>
            </div>
          </div>
        </form>
      </ModalView>
    </>
  );
}

export default ClientView;
