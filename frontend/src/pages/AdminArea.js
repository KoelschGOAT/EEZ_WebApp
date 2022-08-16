import '../static/css/AdminArea.css';

import { FcFilmReel, FcTabletAndroid } from 'react-icons/fc';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

//TODO: Shadow Area

const AdminArea = () => {
  let navigate = useNavigate();
  document.title = 'Admin Übersicht';
  return (
    <>
      <h1 className="title">
        <span className="greenstripe">Geräte</span>
        <span className="redstripe">Einstellungen</span>
      </h1>
      <div className="CardViewWrapper">
        <Card
          variant="outlined"
          className="Card"
          sx={{ width: { md: '90%', xl: '25%' } }}
          onClick={() => navigate('/clients')}
        >
          <CardContent
            sx={{ textAlign: 'center', justifyContent: 'center' }}
          >
            <FcTabletAndroid size={'4em'} />

            <Typography variant="h4" color="text.secondary">
              Client
              <br />
              Einstellungen
            </Typography>
          </CardContent>
        </Card>

        <Card
          variant="outlined"
          className="Card"
          sx={{ width: { md: '90%', xl: '25%' } }}
          onClick={() => navigate('/videos')}
        >
          <CardContent
            sx={{ textAlign: 'center', justifyContent: 'center' }}
          >
            <FcFilmReel size={'4em'} />

            <Typography variant="h4" color="text.secondary">
              Video
              <br />
              Einstellungen
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminArea;
