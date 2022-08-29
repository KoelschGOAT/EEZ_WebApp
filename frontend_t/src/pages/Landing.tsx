import React, { FC, useState } from 'react';
import Card from '../components/Card/Card';

type Props = {};

const Landing: FC<Props> = ({}) => {
  return (
    <>
      <h1 className="mt-3 mb-3 text-xl text-center font-bold ">
        Video Übersicht
      </h1>

      <div className="flex flex-col items-center">
        <div className="flex ">
          <Card />
        </div>
      </div>
    </>
  );
};
export default Landing;
