import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDeleteVideos } from '../../services/RequestVideos';
import { Video } from '../../services/types';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
type Props = {
  Videos: Video[];
};

const VideoAdmin = ({ Videos }: Props) => {
  const navigate = useNavigate();

  const handleError = () => {
    console.log('Error');
  };
  const deleteVideo = useDeleteVideos({
    config: {
      onSuccess() {},
      onError: handleError,
    },
  });
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();

    deleteVideo.mutate({ videoId: id });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-3 lg:items-stretch lg:grid lg:grid-cols-3 lg:gap-7 lg:mb-6">
        {Videos.map((video) => (
          <div
            key={video.id}
            className="card  w-[85%] hover:shadow-2xl cursor-pointer  bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="hover:scale-[1.05] transition duration-500 ease-in-out "
                src={`http://${import.meta.env.VITE_SERVER_ADDRESS}${
                  video.screenshot
                }`}
                alt={video.title_de}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                <LanguageDisplayer
                  de={video.title_de}
                  en={video.title_en}
                />
              </h2>
              <div className="card-actions flex justify-between flex-row mt-2 ">
                <button
                  className="btn btn-primary  gap-1"
                  onClick={() => {
                    navigate(`/EditVideo/${video.id}`, {
                      replace: false,
                      state: { video: video },
                    });
                  }}
                >
                  <AiOutlineEdit size="2.5em" />
                  <LanguageDisplayer de="Bearbeiten" en="edit" />
                </button>
                <button
                  className="btn btn-outline  hover:text-red-400 gap-1"
                  onClick={(e) => handleDelete(e, video.id)}
                >
                  <AiOutlineDelete size="2.5em" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoAdmin;
