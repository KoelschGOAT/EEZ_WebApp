import React, { FC, useState } from 'react';
import ButtonSwitcher from '../components/Buttons/ButtonSwitcher';
import Card from '../components/Card/Card';
import Caroussel from '../components/Caroussel';

type Props = {};

const Landing: FC<Props> = ({}) => {
  const [viewMode, setViewMode] = useState(1);
  const setState1 = () => setViewMode(1);
  const setState2 = () => setViewMode(2);
  return (
    <>
      <h1 className="mt-3 mb-3 text-xl text-center font-bold ">
        Video Übersicht
      </h1>
      <ButtonSwitcher
        state={viewMode}
        setState1={setState1}
        setState2={setState2}
      />
      <div className="h-3/6">
        {viewMode === 1 ? (
          <div className="flex flex-col items-center ">
            <div className="flex ">
              <Card />
            </div>{' '}
          </div>
        ) : (
          <Caroussel />
        )}
      </div>
    </>
  );
};
export default Landing;
