import React from 'react';
import './App.css';
import Routing from './utils/Router/Routing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Routing />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
