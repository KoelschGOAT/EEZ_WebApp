import React, { useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { z } from 'zod';
import { Video } from '../../services/types';

import Input from '../../components/Inputs/Input';

import { BiCheckCircle } from 'react-icons/bi';
import Alert from '../../components/Alert/Alert';
import Collapse from '../../components/Collapse';
import Toast from '../../components/Toast';
import {
  useDeleteVideos,
  usePatchVideos,
} from '../../services/RequestVideos';
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
    Toast({
      text: 'Aktion erfolgreich durchgeführt',
      variant: 'success',
      Icon: <BiCheckCircle />,
      TTL: 30,
    });
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

    video.id ? deleteVideo.mutate({ videoId: video.id }) : null;
  };

  // send "values" to database
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form_data = {} as VideoInputType;

    const formData = new FormData();
    if (screenshotFile) {
      formData.append('screenshot', screenshotFile);
      form_data['screenshot'] = screenshotFile;
    }
    if (videoFile) {
      form_data['video'] = videoFile;
      formData.append('video', videoFile);
    }

    formData.append('title_de', title_de);
    formData.append('title_en', title_en);
    formData.append('text_de', text_de);
    formData.append('text_en', text_en);

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
                  style={
                    { '--value': progress } as React.CSSProperties
                  }
                >
                  {progress}%
                </div>
              </>
            ) : (
              <>
                <Collapse
                  defaultState={false}
                  width="self-center w-[90%] lg:w-full max-h-fit  "
                  title="Video"
                >
                  <video
                    autoPlay
                    loop
                    poster={`http://${
                      import.meta.env.VITE_SERVER_ADDRESS
                    }${video.screenshot}`}
                  >
                    <source
                      src={`http://${
                        import.meta.env.VITE_SERVER_ADDRESS
                      }${video.video}`}
                      type="video/*"
                    />
                  </video>{' '}
                  <label
                    htmlFor="videoFile"
                    className="form-label inline-block mb-2 text-primary mt-5"
                  >
                    Video ändern?
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
                </Collapse>
                <Collapse
                  defaultState={false}
                  width="self-center w-[90%] lg:w-full max-h-fit "
                  title="Screenshot"
                >
                  {/*  <Table mapObj={allClients} /> */}
                  <figure>
                    <img
                      src={`http://${
                        import.meta.env.VITE_SERVER_ADDRESS
                      }${video.screenshot}`}
                      alt={video.title_de}
                    />
                  </figure>
                  <label
                    htmlFor="videoFile"
                    className="form-label inline-block mb-2 text-primary mt-5"
                  >
                    Screenshot ändern?
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
                </Collapse>
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
                  textarea
                  label="Deutscher Text"
                  value={text_de}
                  onChange={setText_de}
                  required={true}
                  name="text_de"
                  placeholder="Text DE"
                ></Input>
                <Input
                  label="Englischer Text"
                  textarea
                  value={text_en}
                  onChange={setText_en}
                  required={true}
                  name="text_en"
                  placeholder="Text EN"
                ></Input>

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
