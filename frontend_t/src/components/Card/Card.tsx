import React, { useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import {
  getVideoValidator,
  useGetAllVideos,
  useGetCurrentClientVideos,
} from '../../services/RequestVideos';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';

type Props = {};

const Card = (props: Props) => {
  const navigate = useNavigate();
  const { data } = useGetCurrentClientVideos();

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {data?.map((video) => (
          <div
            key={video.id}
            onClick={() => {
              navigate('/Video', {
                replace: false,
                state: { video },
              });
            }}
            className="card hover:shadow-2xl border-solid border-2 border-gray-200 cursor-pointer w-96 bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={`http://127.0.0.1:8000${video.screenshot}`}
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
              <p>
                {' '}
                <LanguageDisplayer
                  de={video.text_de}
                  en={video.text_en}
                />
              </p>
              <div className="card-actions justify-end mt-2 ">
                <button className="btn btn-primary w-full">
                  <BsFillPlayFill size="2.5em" />{' '}
                  <LanguageDisplayer de="Abspielen" en="Play" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Card;
