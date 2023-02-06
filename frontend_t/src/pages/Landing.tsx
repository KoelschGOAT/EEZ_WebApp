import { FC } from "react";
import VideoOverviewCard from "../components/VideoOverviewCard";
import { useGetCurrentClientVideos } from "../services/RequestVideos";
import LanguageDisplayer from "../utils/Language/Language/LanguageDisplayer";

type Props = {};

const Landing: FC<Props> = ({}) => {
  const Videos = useGetCurrentClientVideos();
  return (
    <>
      <h1 className="mt-3 mb-3 text-center text-xl font-bold ">
        <LanguageDisplayer de="Video Übersicht" en="Video overview" />
      </h1>

      <div className="mt-16 h-3/6">
        <Helper />
        {/*  {viewMode === 1 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="flex ">
              <Card />
            </div>{" "}

          </div>
        ) : (
          <Caroussel />
        )} */}
      </div>
    </>
  );
};
export default Landing;
export const Helper = () => {
  const { data, isLoading, isError } = useGetCurrentClientVideos();
  if (isError) return <div>Fehler</div>;
  if (data !== undefined)
    return (
      <>
        <div className="mx-5 grid grid-cols-3 gap-5 ">
          {data.map((video) => (
            <VideoOverviewCard key={video.id} Video={video} />
          ))}
        </div>{" "}
      </>
    );
  return <progress className="progress"></progress>;
};
