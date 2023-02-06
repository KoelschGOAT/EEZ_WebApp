import { useNavigate } from "react-router-dom";
import { Video } from "../services/types";

type Props = {
  Video: Video;
};

const VideoOverviewCard = ({ Video, ...rest }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="card flex w-[90%] flex-col gap-1">
      <div className="bg-primary p-3">
        <hr className="h-3 w-10 bg-accent" />
        <span className="text-white">{Video.title_de}</span>
      </div>
      <div className="card-body bg-white">
        <div>{Video.text_de}</div>
      </div>
    </div>
  );
};

export default VideoOverviewCard;
