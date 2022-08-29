import React from 'react';
import Stat from './Stat';

interface Props {
  videos: Array<object> | undefined;
  clients: Array<object> | undefined;
  currentClient: object | undefined;
  handleClick: Function;
}

const Dashboard: React.FC<Props> = ({
  videos,
  clients,
  currentClient,
  handleClick,
}) => {
  return (
    <div className="flex my-5 justify-center">
      <Stat
        clients={clients}
        videos={videos}
        currentClient={currentClient}
        handleClick={handleClick}
      />
    </div>
  );
};

export default Dashboard;
