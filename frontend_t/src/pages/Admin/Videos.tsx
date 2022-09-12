import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Collapse from '../../components/Collapse';

interface Props {}

const Videos: React.FC<Props> = () => {
  return (
    <div className="overflow-auto h-screen gap-5">
      <Link
        to={'/NewVideo'}
        className="btn btn-primary self-center w-full mb-5"
      >
        Video erstellen
      </Link>
      <Card buttonText="bearbeiten" />
    </div>
  );
};

export default Videos;
