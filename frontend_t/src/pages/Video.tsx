import { useLocation } from 'react-router-dom';
import { z } from 'zod';
import LanguageDisplayer from '../utils/Language/Language/LanguageDisplayer';

export const videoValidator = z.object({
  video: z.string(),
  screenshot: z.string(),
  published: z.string(),
  title_de: z.string().max(200),
  title_en: z.string().max(200),
  text_de: z.string().max(2000),
  text_en: z.string().max(2000),
});
interface VideoInterface {
  id: number;
  video: string;
  screenshot: string;
  published: string;
  title_de: string;
  title_en: string;
  text_de: string;
  text_en: string;
}
type LocationState = {
  Video: VideoInterface;
};
const Video = () => {
  const location = useLocation();
  const state = location.state; // Type Casting, then you can get the params passed via router
  const { Video } = state as LocationState;

  return (
    <>
      <div className="flex  ml-7 my-7 min-h-fit min-w-fit">
        <div className=" flex flex-col lg:flex-row gap-5 ">
          <video
            className="w-[90%] lg:w-[60rem] h-auto"
            autoPlay
            loop
            poster={`http://192.168.178.3:8000${Video.screenshot}`}
          >
            <source
              src={`http://192.168.178.3:8000${Video.video}`}
              type="video/webm"
            />
          </video>

          <div className="w-full">
            <h1 className="text-5xl  w-fit font-bold">
              <LanguageDisplayer
                de={Video.title_de}
                en={Video.title_en}
              />
            </h1>
            <p className="py-6 w-[90%] lg:w-[30rem]">
              <LanguageDisplayer
                de={Video.text_de}
                en={Video.text_en}
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Video;
