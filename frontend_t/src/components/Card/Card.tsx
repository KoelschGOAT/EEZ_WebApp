import { UseQueryResult } from '@tanstack/react-query';
import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import {
  getVideoValidator,
  useGetAllVideos,
  useGetCurrentClientVideos,
} from '../../services/RequestVideos';
import { Video } from '../../services/types';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';

type Props = { buttonText?: string };

const Card = (props: Props) => {
  const { buttonText } = props;
  const navigate = useNavigate();
  let DataType: UseQueryResult<Video[], unknown>;
  if (buttonText) {
    DataType = useGetAllVideos();
  } else DataType = useGetCurrentClientVideos();
  const { data } = DataType;
  console.log(data);
  return (
    <>
      <div className="flex flex-col items-center gap-3 lg:items-stretch lg:grid lg:grid-cols-3 lg:gap-6 lg:mb-6">
        {/* <div
        className="flex flex-col md
    :items-center xs:items-center lg:grid lg:grid-cols-3 lg:gap-6 lg:mb-6"
      > */}
        {data?.map((video) => (
          <div
            key={video.id}
            onClick={() => {
              navigate(
                buttonText ? `/EditVideo/${video.id}` : '/Video',
                {
                  replace: false,
                  state: { video },
                }
              );
            }}
            className="card  w-[90%] hover:shadow-2xl cursor-pointer lg:w-96 bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="hover:scale-110  transition duration-500 ease-in-out "
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
              {!buttonText ? (
                <p>
                  {' '}
                  <LanguageDisplayer
                    de={video.text_de}
                    en={video.text_en}
                  />
                </p>
              ) : null}

              <div className="card-actions justify-end mt-2 ">
                <button className="btn btn-primary w-full gap-1">
                  {buttonText ? (
                    <AiOutlineEdit size="2.5em" />
                  ) : (
                    <BsFillPlayFill size="2.5em" />
                  )}{' '}
                  {buttonText ? (
                    buttonText
                  ) : (
                    <LanguageDisplayer de="Abspielen" en="Play" />
                  )}
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
