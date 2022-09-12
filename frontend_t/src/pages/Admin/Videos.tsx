import React from 'react';
import Card from '../../components/Card/Card';
import Collapse from '../../components/Collapse';

interface Props {}

const Videos: React.FC<Props> = () => {
  return (
    <div className="overflow-auto h-screen">
      <Card buttonText="bearbeiten" />
    </div>
  );
};

export default Videos;
