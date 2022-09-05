import React from 'react';
import { z } from 'zod';
import Collapse from '../../components/Collapse';
import { getClientValidator } from '../../services/RequestClients';
import MuiTable from './MuiTable';
import Table from './Table';
export const getVideoValidator = z
  .object({
    video: z.string(),
    screenshot: z.string(),
    published: z.string(),
    title_de: z.string().max(200),
    title_en: z.string().max(200),
    text_de: z.string().max(2000),
    text_en: z.string().max(2000),
  })
  .array();
export type Video = {
  video: string;
  screenshot: string;
  title_de: string;
  title_en: string;
  text_de: string;
  text_en: string;
};
export type Client = {
  pc_name: string;
  ip_address: string;
  is_expo_client: string;
  Videos: Video[];
};

interface Props {
  allClients?: Client[];
}

const Clients: React.FC<Props> = ({ allClients }) => {
  return (
    <>
      <Collapse
        width="self-center w-[90%] lg:w-2/4 "
        title="Client Tabelle"
      >
        {/*  <Table mapObj={allClients} /> */}

        <MuiTable allClients={allClients} />
      </Collapse>
    </>
  );
};
export default Clients;
