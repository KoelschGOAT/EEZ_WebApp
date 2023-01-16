import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Card from '../components/Card/Card';
import Caroussel from '../components/Caroussel';
import LanguageDisplayer from '../utils/Language/Language/LanguageDisplayer';

type Props = {};

const Landing: FC<Props> = ({}) => {
  const [viewMode, setViewMode] = useState(1);
  const setState1 = () => setViewMode(1);
  const setState2 = () => setViewMode(2);
  return (
    <>
      <h1 className="mt-3 mb-3 text-xl text-center font-bold ">
        <LanguageDisplayer de="Video Übersicht" en="Video overview" />
      </h1>

      <div className="h-3/6 mt-16">
        {viewMode === 1 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="flex ">
              <Card />
            </div>{' '}
          </div>
        ) : (
          <Caroussel />
        )}
      </div>
      <Outlet />
    </>
  );
};
export default Landing;
