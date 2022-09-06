import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { z } from 'zod';
import useForm from '../../components/Inputs/useForm';
import Client, { Video } from '../../services/types';

import CheckboxList from '../../components/Inputs/CheckboxList';
import Input from '../../components/Inputs/Input';
import List from '../../components/Inputs/List';
import TextField from '../../components/Inputs/TextField';
import TextInput from '../../components/Inputs/TextInput';
import ErroNotFound2 from '../../Images/ErroNotFound2.svg';
import {
  useGetClient,
  useGetCurrentClient,
  usePatchClients,
} from '../../services/RequestClients';
import {
  useGetAllVideos,
  useGetCurrentClientVideos,
} from '../../services/RequestVideos';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
import NotFound from '../NotFound';

export const getVideoValidator = z.object({
  id: z.number(),
  video: z.string(),
  screenshot: z.string(),
  published: z.string(),
  title_de: z.string().max(200),
  title_en: z.string().max(200),
  text_de: z.string().max(2000),
  text_en: z.string().max(2000),
});
export const getClientValidator = z.object({
  id: z.number(),
  pc_name: z.string(),
  ip_address: z
    .string()
    .regex(
      new RegExp(
        '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
      ),
      { message: 'IP Adresse not in Format' }
    ),
  is_expo_client: z.boolean(),
  Videos: z.array(getVideoValidator),
});

interface ClientInterface {
  id: number;
  ip_address: string;
  pc_name: string;
  is_expo_client: boolean;
  Videos: Video[];
}
type Props = {};
const EditClient: React.FC<Props> = () => {
  type LocationState = {
    client: ClientInterface;
    allVideos: Video[];
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { client, allVideos } = location.state as LocationState;
  const { id } = useParams<string>();

  // Type Casting, then you can get the params passed via router
  if (!client || !id) return <NotFound path="/Admin" />;
  const [clientInput, setClientInput] = useState({
    pc_name: client?.pc_name ?? '',
    ip_address: client?.ip_address ?? '',
    is_expo_client: client?.is_expo_client ?? '',
    Videos: client?.Videos ?? [],
  });
  const [clientName, setClientName] = useState(client?.pc_name ?? '');
  const [clientIpAddress, setClientIpAddress] = useState(
    client?.ip_address ?? ''
  );
  const [isExpoClient, setIsExpoClient] = useState(
    client?.is_expo_client ?? ''
  );
  const [clientVideos, setClientVideos] = useState(
    client?.Videos ?? []
  );

  //UPDATE Client Logic
  const handleSuccess = () => {
    console.log('success');
    navigate('/Admin');
  };
  const handleError = () => {
    console.log('Error');
  };
  const updateClient = usePatchClients({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });
  // send "values" to database
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = {} as Client;
    formData['pc_name'] = clientName;
    formData['ip_address'] = clientIpAddress;
    formData['is_expo_client'] = isExpoClient;
    formData['Videos'] = clientVideos;

    updateClient.mutate({ clientId: client.id, formData: formData });
    console.log(formData);
  }

  return (
    <>
      <div className="flex justify-center ">
        <div className="mt-16 w-1/2 shadow-lg p-5 bg-white rounded">
          <h1 className="prose-xl">
            Einstelleungen für{' '}
            <span className="text-secondary">{client?.pc_name}</span>
          </h1>
          <form className="mt-5" onSubmit={onSubmit}>
            <Input
              label="Client Name"
              value={clientName}
              onChange={setClientName}
              required={true}
              name="pc_name"
            ></Input>
            <Input
              label="IP Adresse"
              value={clientIpAddress}
              onChange={setClientIpAddress}
              required={true}
              name="ip_address"
            ></Input>
            <label className="flex  gap-5 cursor-pointer">
              <span className="label-text">Austellungs Client?</span>
              <input
                type="checkbox"
                checked={isExpoClient}
                className="checkbox checkbox-primary"
                onChange={() => {
                  setIsExpoClient(!isExpoClient);
                }}
              />
            </label>
            {/*             <List pcVideos={client?.Videos} allVideos={allVideos} />{' '}
             */}{' '}
            <CheckboxList
              clientVideos={clientVideos}
              setClientVideos={setClientVideos}
              allVideos={allVideos}
            />{' '}
            <div className="flex justify-left items-center mt-7 gap-5">
              <button type="submit" className="btn btn-primary">
                Änderung Speichern
              </button>
              <button className="btn btn-outline btn-error">
                Löschen
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditClient;
