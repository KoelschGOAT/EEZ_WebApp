import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import DisplaySelection from '../../components/DisplaySelection/DisplaySelection';
import Footer from '../../components/Footer/Footer';
import Stellenanzeige from '../../components/Footer/Stellenanzeige';
import theme from '../../components/Mui/Theme';
import Navbar from '../../components/Navbar';
import VideoSelection from '../../components/VideoSelection/VideoSelection';
import AdminArea from '../../pages/AdminArea';
import Landing from '../../pages/Landing';
import SingleVideo from '../../pages/SingleVideo';
import { AppProvider } from '../Context/AppContext';
function Routing() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppProvider>
          <Navbar />
          <Routes>
            <Route index element={<Landing />}></Route>
            <Route
              path="SingleVideo"
              element={<SingleVideo />}
            ></Route>
            <Route path="Admin" element={<AdminArea />}></Route>
            <Route path="videos" element={<VideoSelection />}></Route>
            <Route
              path="clients"
              element={<DisplaySelection />}
            ></Route>
            <Route
              path="stellenanzeige"
              element={<Stellenanzeige />}
            ></Route>
          </Routes>
          <Footer />
        </AppProvider>
      </Router>
    </ThemeProvider>
  );
}

export default Routing;
