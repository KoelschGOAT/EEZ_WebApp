import 'react-toastify/dist/ReactToastify.css';
import '../../static/css/DisplaySelection.css';

import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import MonitorIcon from '@mui/icons-material/Monitor';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { GrAdd } from 'react-icons/gr';
import ClientView from '../../pages/Clients/ClientView';
import Loader from '../Feedback/Loader';
import Notification from '../Feedback/Notification';
import AddPCPopUp from './AddPCPopUp';
import PopUp from './PopUp';

const DisplaySelection = () => {
  const [EditPopupOpen, setEditPopupOpen] = useState(false);

  const [selectedPC, setSelectedPC] = useState();
  const [addPopUp, setAddPopUp] = useState(false);
  const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const allPCs = useQuery('all-pcs', () =>
    fetchData(`http://127.0.0.1:8000/api/all-pcs`)
  );
  const allVids = useQuery('all-videos', () =>
    fetchData(`http://127.0.0.1:8000/api/all-videos`)
  );
  const isError = allPCs.isError || allVids.isError;
  const isLoading = allPCs.isLoading || allVids.isLoading;
  const data = allVids.data || allPCs.data;
  const STYLE_WRAPPER = {
    width: '100vmax',
    height: '100px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 200px)',
    gridTemplateRows: 'repeat(3)',
    justifyContent: 'center',
    gridGap: '5vmin',
    margin: '2rem 0 2rem 0',
  };

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
        <ClientView
          allVideos={allVids.data}
          pc={selectedPC}
          onClose={() => {
            setEditPopupOpen(false);
          }}
        />
      ) : null}
      {addPopUp ? (
        <ClientView
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
