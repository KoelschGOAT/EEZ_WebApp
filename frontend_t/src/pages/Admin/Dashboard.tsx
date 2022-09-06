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
    <Stat
      clients={clients}
      videos={videos}
      currentClient={currentClient}
      handleClick={handleClick}
    />
  );
};

export default Dashboard;
