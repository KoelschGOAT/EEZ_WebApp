import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
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

import Alert from '../../components/Alert/Alert';
import {
  useDeleteClients,
  useGetClient,
  useGetCurrentClient,
  usePatchClients,
} from '../../services/RequestClients';
import {
  useDeleteVideos,
  useGetAllVideos,
  useGetCurrentClientVideos,
  usePatchVideos,
} from '../../services/RequestVideos';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
import NotFound from '../NotFound';

export const getVideoValidator = z.object({
  id: z.number().optional(),
  video: z
    .instanceof(File, { message: 'Kein Video ausgewählt' })
    .optional(),
  screenshot: z
    .instanceof(File, {
      message: 'Kein Screenshot ausgewählt',
    })
    .optional(),
  published: z.string().optional(),
  title_de: z.string().max(200, { message: 'Titel DE zu lang' }),
  title_en: z.string().max(200, { message: 'Titel EN zu lang' }),
  text_de: z.string().max(2000, { message: 'Text DE zu lang' }),
  text_en: z.string().max(2000, { message: 'Text EN zu lang' }),
});
export type VideoInputType = {
  video: File;
  screenshot: File;

  title_de: string;
  title_en: string;
  text_de: string;
  text_en: string;
};
type Props = {};
const EditVideo: React.FC<Props> = () => {
  type LocationState = {
    video: Video;
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { video } = location.state as LocationState;
  const { id } = useParams<string>();

  // Type Casting, then you can get the params passed via router
  if (!video || !id) return <NotFound path="/Admin" />;
  const [inputError, setInputError] = useState({
    open: false,
    message: '',
  });

  const [videoString, setVideoString] = useState(video.video ?? '');
  const [screenshot, setScreenshot] = useState(
    video.screenshot ?? ''
  );
  const [videoFile, setVideoFile] = useState<File>();
  const [screenshotFile, setScreenshotFile] = useState<File>();
  const [title_de, setTitle_de] = useState(video.title_de ?? '');
  const [title_en, setTitle_en] = useState(video.title_en ?? '');
  const [text_de, setText_de] = useState(video.text_de ?? '');
  const [text_en, setText_en] = useState(video.text_en ?? '');
  const [progress, setProgress] = useState(0);
  //UPDATE client Logic
  const handleSuccess = () => {
    console.log('success');
    navigate('/Admin');
  };
  const handleError = () => {
    console.log('Error');
  };
  const updateVideo = usePatchVideos({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });
  const deleteVideo = useDeleteVideos({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    console.log('delete');

    video.id ? deleteVideo.mutate({ videoId: video.id }) : null;
  };

  // send "values" to database
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form_data = {} as VideoInputType;

    const formData = new FormData();
    if (videoFile && screenshotFile) {
      formData.append('video', videoFile);
      formData.append('screenshot', screenshotFile);
      form_data['video'] = videoFile;
      form_data['screenshot'] = screenshotFile;
    }

    formData.append('title_de', title_de);
    formData.append('title_en', title_en);
    formData.append('text_de', text_de);
    formData.append('text_en', text_en);
    console.log(formData);

    form_data['title_de'] = title_de;
    form_data['title_en'] = title_en;
    form_data['text_de'] = text_de;
    form_data['text_en'] = text_en;

    try {
      getVideoValidator.parse(form_data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        /* map zod errors to the appropriate form fields */
        console.log(error);
        setInputError({
          open: true,
          message: error.errors[0].message,
        });
        return;
      }
    }

    video.id
      ? updateVideo.mutate({
          videoId: video.id,
          formData: formData,
          setProgress: setProgress,
        })
      : null;
    console.log(formData);
  }

  const changeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    setVideoFile(fileList[0]);
  };
  const changeScreenshot = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = e.target.files;

    if (!fileList) return;

    setScreenshotFile(fileList[0]);
  };

  return (
    <>
      <div className="flex justify-center ">
        <div className="mt-16 w-1/2 shadow-lg p-5 bg-white rounded">
          <h1 className="prose-xl">
            Einstelleungen für{' '}
            <span className="text-secondary">{video.title_de}</span>
          </h1>
          <Alert
            open={inputError.open}
            title="Fehler bei der Eingabe"
            text={inputError.message}
          />
          <form className="mt-5" onSubmit={onSubmit}>
            {updateVideo.isLoading ? (
              <>
                {' '}
                <div
                  className="radial-progress text-primary"
                  style={{ '--value': progress }}
                >
                  {progress}%
                </div>
              </>
            ) : (
              <>
                <label
                  htmlFor="videoFile"
                  className="form-label inline-block mb-2 text-primary"
                >
                  Video auswählen
                </label>
                <input
                  className="form-control  block    w-full    px-3    py-1.5 text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-accent focus:outline-none"
                  type="file"
                  id="videoFile"
                  onChange={changeVideo}
                  accept="video/*"
                ></input>
                <label
                  htmlFor="videoFile"
                  className="form-label inline-block mb-2 text-primary"
                >
                  Screenshot auswählen
                </label>
                <input
                  className="form-control  block    w-full    px-3    py-1.5 text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-accent focus:outline-none "
                  type="file"
                  id="videoFile"
                  onChange={changeScreenshot}
                  accept="image/*"
                ></input>
                <Input
                  label="Deutscher Titel"
                  value={title_de}
                  onChange={setTitle_de}
                  required={true}
                  name="title_de"
                  placeholder="Titel DE"
                ></Input>
                <Input
                  label="Englischer Titel"
                  value={title_en}
                  onChange={setTitle_en}
                  required={true}
                  name="title_en"
                  placeholder="Titel EN"
                ></Input>
                <Input
                  label="Deutscher Text"
                  value={text_de}
                  onChange={setText_de}
                  required={true}
                  name="text_de"
                  placeholder="Text DE"
                ></Input>
                <Input
                  label="Englischer Text"
                  value={text_en}
                  onChange={setText_en}
                  required={true}
                  name="text_en"
                  placeholder="Text EN"
                ></Input>
                {/*             <List pcVideos={client?.Videos} allVideos={allVideos} />{' '}
                 */}{' '}
                <div className="flex justify-left items-center mt-7 gap-5">
                  <button
                    type="submit"
                    className={`btn btn-primary ${
                      updateVideo.isLoading ? 'loading' : null
                    }`}
                  >
                    Änderung Speichern
                  </button>
                  <button
                    onClick={handleDelete}
                    className={`btn btn-outline btn-error modal-button`}
                  >
                    Löschen
                  </button>
                </div>
              </>
            )}
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

export default EditVideo;
