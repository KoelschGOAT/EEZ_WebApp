import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { z } from 'zod';
import Input from '../../components/Inputs/Input';
import List from '../../components/Inputs/List';
import TextField from '../../components/Inputs/TextField';
import TextInput from '../../components/Inputs/TextInput';
import ErroNotFound2 from '../../Images/ErroNotFound2.svg';
import {
  useGetClient,
  useGetCurrentClient,
} from '../../services/RequestClients';
import {
  useGetAllVideos,
  useGetCurrentClientVideos,
} from '../../services/RequestVideos';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
import NotFound from '../NotFound';
type Props = {};
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
interface Video {
  id: number;
  video: string;
  screenshot: string;
  title_de: string;
  title_en: string;
  text_de: string;
  text_en: string;
}
interface ClientInterface {
  id: number;
  pc_name: string;
  is_expo_client: boolean;
  Videos: Video[];
}

const EditClient: React.FC<Props> = () => {
  const navigate = useNavigate();

  const { id } = useParams<string>();
  console.log(id);
  // Type Casting, then you can get the params passed via router

  const { data: allVideosData, isError: AllVideosError } =
    useGetAllVideos();
  const { data, isError: currentClientError } = useGetClient(id);

  const [clientName, setClientName] = useState(data?.pc_name);
  const [clientIpAddress, setClientIpAddress] = useState(
    data?.ip_address
  );
  const [isExpoClient, setIsExpoClient] = useState(
    data?.is_expo_client
  );
  if (currentClientError) return <NotFound path="/Admin" />;
  return (
    <>
      <div className="flex justify-center ">
        <div className="mt-16 w-1/2 shadow-lg p-5 bg-white rounded">
          <h1 className="prose-xl">
            Einstelleungen für{' '}
            <span className="text-secondary">{data?.pc_name}</span>
          </h1>
          <form className="mt-5">
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
            <div className="flex justify-left items-center mt-7 gap-5">
              <button type="submit" className="btn btn-primary">
                Änderung Speichern
              </button>
              <button className="btn btn-outline btn-error">
                Löschen
                <input
                  type="checkbox"
                  id="delete-modal"
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">
                      Congratulations random Internet user!
                    </h3>
                    <p className="py-4">
                      You've been selected for a chance to get one
                      year of subscription to use Wikipedia for free!
                    </p>
                    <div className="modal-action">
                      <label htmlFor="delete-modal" className="btn">
                        Yay!
                      </label>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditClient;
