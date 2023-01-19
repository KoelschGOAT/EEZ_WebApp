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
  video: VideoInterface;
};
const Video = () => {
  const location = useLocation();
  const state = location.state; // Type Casting, then you can get the params passed via router
  const { video } = state as LocationState;

  return (
    <>
      <div className="flex  ml-7 my-7 min-h-fit min-w-fit">
        <div className=" flex flex-col lg:flex-row gap-5 ">
          {video.video.endsWith('.svg') ? (
            <>
              {' '}
              <div className=" flex justify-center items-center ">
                <div className="w-[85%] ">
                  <img
                    className=""
                    src={`http://${
                      import.meta.env.VITE_SERVER_ADDRESS
                    }${video.video}`}
                  ></img>
                </div>
              </div>
            </>
          ) : (
            <>
              <video
                className="w-[90%] lg:w-[60rem] h-auto"
                autoPlay
                loop
                poster={`http://${
                  import.meta.env.VITE_SERVER_ADDRESS
                }${video.screenshot}`}
              >
                <source
                  src={`http://${
                    import.meta.env.VITE_SERVER_ADDRESS
                  }${video.video}`}
                  type="Video/webm"
                />
              </video>
              <div className="w-full">
                <h1 className="text-5xl  w-fit font-bold">
                  <LanguageDisplayer
                    de={video.title_de}
                    en={video.title_en}
                  />
                </h1>
                <p className="py-6 w-[90%] lg:w-[30rem]">
                  <LanguageDisplayer
                    de={video.text_de}
                    en={video.text_en}
                  />
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Video;
