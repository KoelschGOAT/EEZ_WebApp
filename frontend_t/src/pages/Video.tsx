import { useLocation } from "react-router-dom";
import { z } from "zod";
import LanguageDisplayer from "../utils/Language/Language/LanguageDisplayer";

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
      <div className="my-7  ml-7 flex min-h-fit min-w-fit">
        <div className=" flex flex-col gap-5 lg:flex-row ">
          {video.video.endsWith(".svg") ? (
            <>
              {" "}
              <div className=" flex items-center justify-center ">
                <div className="w-[85%] ">
                  <img
                    className=""
                    src={`http://${import.meta.env.VITE_SERVER_ADDRESS}${
                      video.video
                    }`}
                  ></img>
                </div>
              </div>
            </>
          ) : (
            <>
              <video
                className="h-auto w-[90%] lg:w-[60rem]"
                autoPlay
                loop
                poster={`http://${import.meta.env.VITE_SERVER_ADDRESS}${
                  video.screenshot
                }`}
              >
                <source
                  src={`http://${import.meta.env.VITE_SERVER_ADDRESS}${
                    video.video
                  }`}
                  type="Video/webm"
                />
              </video>
              <div className="w-full">
                <h1 className="w-fit  text-5xl font-bold">
                  <LanguageDisplayer de={video.title_de} en={video.title_en} />
                </h1>
                <p className="w-[90%] py-6 lg:w-[30rem]">
                  <LanguageDisplayer de={video.text_de} en={video.text_en} />
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
