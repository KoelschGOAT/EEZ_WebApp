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

import AlertDialog from '../../components/Dialog/Dialog';
import CheckboxList from '../../components/Inputs/CheckboxList';
import Input from '../../components/Inputs/Input';

import Alert from '../../components/Alert/Alert';
import {
  useDeleteClients,
  useGetClient,
  useGetCurrentClient,
  usePatchClients,
  usePostClients,
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
  id: z.number().optional(),
  pc_name: z.string().min(4, { message: 'Name zu kurz' }),
  ip_address: z
    .string()
    .regex(
      new RegExp(
        '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
      ),
      { message: 'IP Adresse nicht im richtigem Format' }
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
const AddClient: React.FC<Props> = () => {
  type LocationState = {
    allVideos: Video[];
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { allVideos } = location.state as LocationState;
  // Type Casting, then you can get the params passed via router
  const [open, setOpen] = useState(false);

  const [clientName, setClientName] = useState('');
  const [clientIpAddress, setClientIpAddress] = useState('');
  const [isExpoClient, setIsExpoClient] = useState(false);
  const [clientVideos, setClientVideos] = useState(allVideos);

  //UPDATE client Logic
  const handleSuccess = () => {
    console.log('success');
    navigate('/Admin');
  };
  const handleError = () => {
    console.log('Error');
  };
  const postClient = usePostClients({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });
  const [inputError, setInputError] = useState({
    open: false,
    message: '',
  });
  // send "values" to database
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = {} as Client;
    formData['pc_name'] = clientName;
    formData['ip_address'] = clientIpAddress;
    formData['is_expo_client'] = isExpoClient;
    formData['Videos'] = clientVideos;

    try {
      getClientValidator.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        /* map zod errors to the appropriate form fields */

        setInputError({
          open: true,
          message: error.errors[0].message,
        });
        return;
      }
    }
    postClient.mutate({ formData: formData });
    console.log(formData);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log('close');
    setOpen(false);
  };
  return (
    <>
      <div className="flex justify-center ">
        <div className="mt-16 w-1/2 shadow-lg p-5 bg-white rounded">
          <h1 className="prose-xl">Neuen Client erstellen</h1>
          <Alert
            open={inputError.open}
            title="Fehler bei der Eingabe"
            text={inputError.message}
          />
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
              <button
                type="submit"
                className={`btn btn-primary ${
                  postClient.isLoading ? 'loading' : null
                }`}
              >
                Client erstellen
              </button>
            </div>
          </form>
          {/* <AlertDialog
            title_de={`${client?.pc_name}`}
            title_en={`${client?.pc_name}`}
            text_en={`do you really want to delete ${client?.pc_name}? `}
            text_de={`Willst du ${client?.pc_name} wirklich löschen?`}
            handleClose={() => handleClose}
            handleSubmit={() => handleDelete}
            open={open}
          ></AlertDialog> */}
        </div>
      </div>
    </>
  );
};

export default AddClient;
