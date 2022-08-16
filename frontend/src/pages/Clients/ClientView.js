import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import ButtonLoader from '../../components/Feedback/ButtonLoader';
import CheckboxList from '../../components/DisplaySelection/CheckboxList';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalView from './ModalView';
import MuiAccordion from '../../components/Mui/Accordion';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function ClientView({ onClose, pc, allVideos, setNoti }) {
  const [pcName, setPcName] = useState(pc.pc_name);
  const [ipAddress, setIpAddress] = useState(pc.ip_address);
  const [pcVideos, setPcVideos] = useState(pc.Videos);
  const [inputError, setInputError] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState('');

  const queryClient = useQueryClient();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const putPC = useMutation(
    (formData) =>
      axios.patch(`http://127.0.0.1:8000/api/pc/${pc.id}`, formData),
    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries('all-pcs');
        //wait for closing to display success
        setTimeout(() => onClose(), 1000);
      },
      onError: () => {
        setInputError(true);
        setInputErrorMessage(
          'Ein unerwarteter Fehler ist augetreten'
        );
        console.log('error');
      },
    }
  );
  const deletePC = useMutation(
    () => axios.delete(`http://127.0.0.1:8000/api/pc/${pc.id}`),

    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('all-pcs');
        setTimeout(() => onClose(), 1000);
      },
      onError: () => {
        setInputError(true);
        setInputErrorMessage(
          'Ein unerwarteter Fehler ist augetreten'
        );
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
    event.preventDefault();
    const formData = {};

    formData['pc_name'] = pcName;
    formData['ip_address'] = ipAddress;

    formData['Videos'] = pcVideos;
    if (pcName.length <= 4 || ipAddress.length <= 6) {
      setInputError(true);
      setInputErrorMessage(
        'Eingabe Felder leer oder zu wenig Ziffern'
      );
    } else if (
      ipAddress.match(
        '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
      ) == null
    ) {
      setInputError(true);
      setInputErrorMessage('IP Adresse entspricht nicht der Norm');
    } else putPC.mutate(formData);
  };

  return (
    <>
      <ModalView
        onClose={onClose}
        title={`Client Einstellungen - ${pc?.pc_name}`}
      >
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
                  inputProps={{
                    pattern:
                      '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
                  }}
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
                  text="Ändern"
                  sx={{ height: '3rem', color: '#fff' }}
                  onClick={onSubmit}
                  isLoading={putPC.isLoading}
                  isSuccess={putPC.isSuccess}
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
