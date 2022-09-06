import React from 'react';
import { z } from 'zod';
import Collapse from '../../components/Collapse';
import { getClientValidator } from '../../services/RequestClients';
import Client, { Video } from '../../services/types';
import MuiTable from './MuiTable';

interface Props {
  allClients: Client[];
  allVideos: Video[];
}

const Clients: React.FC<Props> = ({ allClients, allVideos }) => {
  return (
    <>
      <Collapse
        width="self-center w-[90%] lg:w-2/4 "
        title="Client Tabelle"
      >
        {/*  <Table mapObj={allClients} /> */}

        <MuiTable allVideos={allVideos} allClients={allClients} />
      </Collapse>
    </>
  );
};
export default Clients;
