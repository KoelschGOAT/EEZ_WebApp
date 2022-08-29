import React from 'react';
import { z } from 'zod';
import Collapse from '../../components/Collapse';
import { getClientValidator } from '../../services/RequestClients';
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

interface Props {
  allClients: typeof getClientValidator;
}

const Clients: React.FC<Props> = ({ allClients }) => {
  return (
    <>
      <Collapse width="self-center w-1/2" title="Client Tabelle">
        <Table mapObj={allClients} />
      </Collapse>
    </>
  );
};
export default Clients;
