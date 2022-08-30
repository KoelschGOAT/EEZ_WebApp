import React from 'react';
import { TbLayoutGrid, TbSlideshow } from 'react-icons/tb';
type Props = {
  state?: number;
  setState1?: () => void;
  setState2?: () => void;
  className?: string;
};

function ButtonSwitcher({
  className,
  state,
  setState1,
  setState2,
}: Props) {
  return (
    <>
      <div className="flex justify-center mb-3">
        <button
          onClick={setState2}
          className={`${
            state === 2 ? 'text-accent' : null
          }  gap-1 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-accent  rounded-l-full px-4 py-2 `}
          id="slider"
        >
          <TbSlideshow size="2.5em" />
          <span>Slider</span>
        </button>
        <button
          onClick={setState1}
          className={`${
            state === 1 ? 'text-accent' : null
          } inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-accent  rounded-r-full px-4 py-2`}
          id="list"
        >
          <TbLayoutGrid size={'2.5em'} />
          <span>List</span>
        </button>
      </div>
    </>
  );
}

export default ButtonSwitcher;
