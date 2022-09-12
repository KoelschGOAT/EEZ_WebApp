import React from 'react';
import Show from '../Conditional/Show';
interface Props {
  open: boolean;
  title: string;
  text: string;
}

const Alert = ({ open, title, text }: Props) => {
  return (
    <>
      <Show condition={open}>
        <div className="alert alert-error shadow-lg">
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

            <div>
              <h3 className="font-bold">{title}</h3>
              <div className="text-xs">{text}</div>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};

export default Alert;
