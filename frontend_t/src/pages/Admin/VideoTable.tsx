import React from 'react';
import { BsCameraVideo } from 'react-icons/bs';
import {
  Navigate,
  NavigateFunction,
  useNavigate,
} from 'react-router-dom';
import { z } from 'zod';
import { getClientValidator } from '../../services/RequestClients';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';

export const VideoValidator = z;
z.object({
  id: z.number(),
  video: z.string(),
  screenshot: z.string(),
  published: z.string(),
  title_de: z.string().max(200),
  title_en: z.string().max(200),
  text_de: z.string().max(2000),
  text_en: z.string().max(2000),
}).array();
interface Props {
  mapObj: typeof VideoValidator;
}

const VideoTable: React.FC<Props> = ({ mapObj }) => {
  return (
    <table className="table w-full border-solid border-2 border-gray-200">
      <thead>
        <tr>
          <th className="text-center">Video</th>
          <th className="text-center">Screenshot</th>
          <th className="text-center">Title De</th>
          <th className="text-center">Title En</th>
          <th className="text-center">Text De</th>

          <th className="text-center">Text En</th>

          <th></th>
        </tr>
      </thead>
      <tbody>
        <>
          {mapObj.map((video) => (
            <tr key={video.id}>
              <td className="text-center">{video.video}</td>
              <td className="text-center">
                <td className="text-center">{video.pc_name}</td>
                <td className="text-center">{video.screenshot}</td>
                {video.title_de}
              </td>
              <td className="text-center">{video.title_en}</td>
              <td className="text-center">{video.text_de}</td>
              <td className="text-center">{video.text_en}</td>
              <td>
                <button className="self-center btn btn-ghost btn-md text-secondary">
                  <LanguageDisplayer en="Edit" de="bearbeiten" />
                </button>
              </td>
            </tr>
          ))}
        </>
      </tbody>
    </table>
  );
};

export default VideoTable;
