import React from 'react';
import Card from '../../components/Card/Card';
import Collapse from '../../components/Collapse';
import { getVideoValidator } from '../../services/RequestVideos';
import Table from './Table';
import VideoTable from './VideoTable';
interface Props {}

const Videos: React.FC<Props> = () => {
  return <Card buttonText="bearbeiten" />;
};

export default Videos;
