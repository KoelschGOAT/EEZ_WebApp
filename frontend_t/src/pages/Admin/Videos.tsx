import React from 'react';
import Collapse from '../../components/Collapse';
import Table from './Table';
import VideoTable from './VideoTable';
interface Props {
  allVideos: Array<object>;
}

const Videos: React.FC<Props> = ({ allVideos }) => {
  return (
    <Collapse width="self-center w-1/2" title="Video Tabelle">
      <VideoTable mapObj={allVideos} />
    </Collapse>
  );
};

export default Videos;
