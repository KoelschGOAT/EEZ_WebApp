import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
function Routing() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default Routing;
