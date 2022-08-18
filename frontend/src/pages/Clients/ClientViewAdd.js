import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Show from '../../components/ConditionalRendering/Show';
import CheckboxList from '../../components/DisplaySelection/CheckboxList';
import ButtonLoader from '../../components/Feedback/ButtonLoader';
import Notification from '../../components/Feedback/Notification';
import MuiAccordion from '../../components/Mui/Accordion';
import { usePostClients } from '../../services/RequestClients';
import ModalView from './ModalView';
function ClientViewAdd({ onClose, allVideos, setNoti }) {
  const [pcName, setPcName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [pcVideos, setPcVideos] = useState([]);
  const [inputError, setInputError] = useState({
    error: false,
    message: '',
  });
  const handleSuccess = () => {
    setInputError({ ...inputError, error: false });
    setTimeout(() => onClose(), 1000);
  };
  const handleError = () => {
    setInputError({
      error: true,
      message: 'Ein unerwarteter Fehler ist augetreten',
    });
  };
  const postClients = usePostClients({
    onClose: onClose,
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });

  const onChangeHandler = (e, setState) => {
    e.preventDefault();
    setState(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = {};
    formData['pc_name'] = pcName;
    formData['ip_address'] = ipAddress;
    formData['Videos'] = pcVideos;
    if (pcName.length < 4) {
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
      postClients.mutate({
        formData,
      });
  };

  return (
    <>
      <ModalView onClose={onClose} title={`Neuen Client Erstellen`}>
        {inputError.error && (
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
                  disabled={postClients.isLoading}
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
                  isLoading={postClients.isLoading}
                  isSuccess={postClients.isSuccess}
                  icon={<AddIcon />}
                />
                <Show condition={postClients.isLoading}>
                  {' '}
                  <span
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      alignSelf: 'center',
                    }}
                  >
                    Daten werden hochgeladen, einen Moment...
                  </span>
                </Show>
              </div>
            </div>
          </div>
        </form>
      </ModalView>
    </>
  );
}

export default ClientViewAdd;
