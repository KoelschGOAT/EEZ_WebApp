import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import Cards from '../../components/Card';
import VideoViewAdd from '../../pages/Videos/VideoViewAdd';
import VideoViewEdit from '../../pages/Videos/VideoViewEdit';
import { useGetAllVideos } from '../../services/RequestVideos';
import '../../static/css/Landing.css';
import Loader from '../Feedback/Loader';
function VideoSelection() {
  const [selectedVideo, setSelectedVideo] = useState();
  const [popUp, setPopUp] = useState(false);
  const [addPopUp, setAddPopUp] = useState(false);

  const { data, isError, isLoading } = useGetAllVideos();
  const responseReturn = () => {
    if (isLoading) return <Loader loading={isLoading} />;
    else if (isError) {
      return (
        <Alert className="loading" severity="error">
          Ein unerwarteter Fehler ist aufgetreten
        </Alert>
      );
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="title">
          <span className="greenstripe">Einstellungen</span>
          <span className="redstripe">Videos</span>
        </h1>
        {responseReturn()}

        {data && (
          <div className="grid">
            <div className="wrapper">
              <Card
                sx={{ width: '100%' }}
                variant="outlined"
                onClick={() => {
                  setAddPopUp(true);
                }}
                className="Card"
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GrAdd size={'3em'} />

                  <Typography variant="h4" color="text.secondary">
                    Video
                    <br />
                    erstellen
                  </Typography>
                </CardContent>
              </Card>
            </div>
            {data?.map((video) => (
              <Cards
                onClick={() => {
                  setSelectedVideo(video);
                  setPopUp(true);
                }}
                key={video?.id}
                video={video}
              />
            ))}
          </div>
        )}
      </div>
      {popUp ? (
        <VideoViewEdit
          video={selectedVideo}
          onClose={() => {
            setPopUp(false);
          }}
        />
      ) : null}
      {addPopUp ? (
        <VideoViewAdd
          onClose={() => {
            setAddPopUp(false);
          }}
        />
      ) : null}
    </>
  );
}

export default VideoSelection;
