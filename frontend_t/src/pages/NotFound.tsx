import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErroNotFound from '../Images/ErroNotFound.png';
type Props = { title?: string; path: string };

const NotFound = ({
  title = 'Leider ist ein Fehler aufgetreten',
  path,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div className="mt-5 flex flex-col text-center  justify-center items-center ">
      <div className="w-1/2 alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="prose-xl">{title}</span>
        </div>
      </div>
      <figure className="flex justify-center">
        <img className="w-1/4" src={ErroNotFound}></img>
      </figure>
      <button
        onClick={() => navigate(path, { replace: true })}
        className=" w-1/2 btn btn-primary"
      >
        Zurück zum Hauptmenu
      </button>
    </div>
  );
};
export default NotFound;
