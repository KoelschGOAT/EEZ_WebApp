import axios from 'axios';
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FaTimes } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';
import Cards from '../components/Card';
import Show from '../components/ConditionalRendering/Show';
import Loader from '../components/Feedback/Loader';
import Notification from '../components/Feedback/Notification';
import Modal from '../components/PopUp/Modal';
import '../static/css/Landing.css';
import InputComponent from '../components/VideoSelection/Box';
function Landing() {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data, isError, isLoading, error } = useQuery(
    'current-pc-videos',
    () => fetchData(`http://127.0.0.1:8000/api/current-pc-videos`)
  );

  document.title = 'Übersicht';
  const responseReturn = () => {
    <Loader loading={isLoading} />;

    if (isError && error?.response.status === 401) {
      return (
        <Notification
          severity="warning"
          Title="Fehler"
          Message="Dieser PC ist nicht im System"
        />
      );
    } else if (isError) {
      return (
        <Notification
          severity="error"
          Title="Fehler"
          Message="Ein unerwarteter Fehler ist aufgetreten"
        />
      );
    }
  };
  return (
    <div className="container">
      <h1 className="title" onClick={() => setOpen((o) => !0)}>
        <span className="greenstripe">ENERCON</span>
        <span className="redstripe">Filme</span>
      </h1>

      {open && (
        <Modal onClose={() => setOpen((o) => !o)} title="Test PopUp">
          <InputComponent
            onClose={() => setOpen((o) => !o)}
            video={data[0]}
          />
        </Modal>
      )}
      {responseReturn()}
      {data && data?.length === 0 && (
        <Notification
          severity="warning"
          Title="Warnung"
          Message="Keine Videos für diesen PC eingetragen"
        />
      )}
      {data && (
        <div className="grid">
          {data?.map((video) => (
            <Cards
              key={video?.id}
              video={video}
              onClick={() => {
                navigate('/SingleVideo', {
                  replace: false,
                  state: { video },
                });
              }}
            />
          ))}
        </div>
      )}

      {/*data && <Slider Videos={data} />*/}
    </div>
  );
}

export default Landing;
