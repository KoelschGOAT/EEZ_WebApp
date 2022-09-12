import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import React from 'react';
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';

import Footer from '../components/Footer/Footer';
import Navbar2 from '../components/Navbar/Navbar2';
import AddClient from '../pages/Admin/AddClient';
import AddVideo from '../pages/Admin/AddVideo';
import Admin from '../pages/Admin/Admin';
import Clients from '../pages/Admin/Clients';
import EditClient from '../pages/Admin/EditClient';
import EditVideo from '../pages/Admin/EditVideo';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import Video from '../pages/Video';
function Routing() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar2 />
        <Routes>
          <Route
            path="/EditClient/:id"
            element={<EditClient />}
          ></Route>
          <Route
            path="/EditVideo/:id"
            element={<EditVideo />}
          ></Route>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/Admin" element={<Admin />}></Route>
          <Route path="/NewClient" element={<AddClient />}></Route>
          <Route path="/NewVideo" element={<AddVideo />}></Route>
          <Route path="/video" element={<Video />}></Route>
          <Route path="*" element={<NotFound path="/" />}></Route>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Routing;
