import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import MonitorIcon from '@mui/icons-material/Monitor';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import 'react-toastify/dist/ReactToastify.css';
import ClientViewAdd from '../../pages/Clients/ClientViewAdd';
import ClientViewEdit from '../../pages/Clients/ClientViewEdit';
import { useGetAllClients } from '../../services/RequestClients';
import { useGetAllVideos } from '../../services/RequestVideos';
import '../../static/css/DisplaySelection.css';
import Loader from '../Feedback/Loader';
import Notification from '../Feedback/Notification';
import ToggleButtons from '../Mui/ToggleButton';
const DisplaySelection = () => {
  const [alignment, setAlignment] = useState('list');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [EditPopupOpen, setEditPopupOpen] = useState(false);

  const [selectedPC, setSelectedPC] = useState();
  const [addPopUp, setAddPopUp] = useState(false);

  const allPCs = useGetAllClients();
  const allVids = useGetAllVideos();

  const isError = allPCs.isError || allVids.isError;
  const isLoading = allPCs.isLoading || allVids.isLoading;
  const data = allVids.data || allPCs.data;

  const responseReturn = () => {
    if (isLoading) {
      <Loader loading={isLoading} />;
    }
    if (isError) {
      return (
        <Notification
          Title="Fehler"
          Message="Ein unerwarteter Fehler ist aufgetreten"
        />
      );
    }
  };
  return (
    <>
      {responseReturn()}

      <h1 className="title">
        <span className="greenstripe">Einstellungen</span>
        <span className="redstripe">Clients</span>
      </h1>
      {/* <div className="loading">
        <ToggleButtons
          alignment={alignment}
          handleChange={handleAlignment}
          ariaLabel="toggle-view"
        >
          <ToggleButton value="list" aria-label="list ">
            <FormatListBulletedIcon />
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid">
            <GridViewIcon />
          </ToggleButton>
        </ToggleButtons>
      </div> */}
      {data && !isLoading && !isError && (
        <div className="grid">
          <div className="wrapper">
            <Card
              variant="outlined"
              sx={{ width: '150px' }}
              onClick={() => {
                setAddPopUp(true);
              }}
              className="Card"
            >
              <CardContent
                sx={{
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <GrAdd size={'3em'} />

                <Typography variant="body1" color="text.secondary">
                  PC <br />
                  Hinzufügen
                </Typography>
              </CardContent>
            </Card>
          </div>
          {allPCs.data?.map((pc) => (
            <div key={pc.id} className="wrapper">
              <Card
                variant="outlined"
                sx={{ width: '150px' }}
                onClick={() => {
                  setSelectedPC(pc);
                  setEditPopupOpen(true);
                }}
                className="Card"
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  {/* <img src={screen} alt="PC Logo" width="50px" /> */}
                  <MonitorIcon fontSize="large" />
                  <Typography variant="body2" color="text.secondary">
                    {pc.pc_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pc.ip_address}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
      {/* 
      {addPopUp ? (
        <AddPCPopUp
          onClose={() => {
            setAddPopUp(false);
          }}
          allVideos={allVids.data}
        />
      ) : null} */}
      {EditPopupOpen ? (
        <ClientViewEdit
          allVideos={allVids.data}
          pc={selectedPC}
          onClose={() => {
            setEditPopupOpen(false);
          }}
        />
      ) : null}
      {addPopUp ? (
        <ClientViewAdd
          onClose={() => {
            setAddPopUp(false);
          }}
          allVideos={allVids.data}
        />
      ) : null}
    </>
  );
};

export default DisplaySelection;
