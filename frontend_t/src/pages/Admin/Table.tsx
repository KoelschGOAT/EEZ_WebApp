import React from 'react';
import {
  Navigate,
  NavigateFunction,
  useNavigate,
} from 'react-router-dom';
import { z } from 'zod';
import { getClientValidator } from '../../services/RequestClients';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
export const getVideoValidator = z
  .object({
    id: z.number(),
    video: z.string(),
    screenshot: z.string(),
    published: z.string(),
    title_de: z.string().max(200),
    title_en: z.string().max(200),
    text_de: z.string().max(2000),
    text_en: z.string().max(2000),
  })
  .array();
export const VideoValidator = z;
z.object({
  id: z.number(),
  video: z.string(),
  screenshot: z.string(),
  published: z.string(),
  title_de: z.string().max(200),
  title_en: z.string().max(200),
  text_de: z.string().max(2000),
  text_en: z.string().max(2000),
});

interface Props {
  mapObj: typeof VideoValidator;
}

const Table: React.FC<Props> = ({ mapObj }) => {
  const navigate = useNavigate();
  const convert = (is_expo_client: boolean) => {
    return (
      <LanguageDisplayer
        en={is_expo_client ? 'Yes' : 'No'}
        de={is_expo_client ? 'Ja' : 'Nein'}
      />
    );
  };
  console.log(mapObj);
  return (
    <table className="table w-full ">
      <thead>
        <tr>
          <th className="text-center">Client Name</th>
          <th className="text-center">IP Adresse</th>
          <th className="text-center">Ist Ausstellungs Client</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <>
          {mapObj.map((pc, index) => (
            <tr key={pc.id}>
              <td className="text-center">{pc.pc_name}</td>
              <td className="text-center">{pc.ip_address}</td>
              <td className="text-center">
                {convert(pc.is_expo_client)}
              </td>
              <tr>
                <button
                  onClick={() => {
                    navigate(`/EditClient/${pc.id}`);
                  }}
                  className="self-center btn btn-link btn-md text-secondary"
                >
                  <LanguageDisplayer en="Edit" de="bearbeiten" />
                </button>
              </tr>
            </tr>
          ))}
        </>
      </tbody>
    </table>
  );
};

export default Table;
