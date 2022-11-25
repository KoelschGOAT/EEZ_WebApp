import React from 'react';
import { BiSearch } from 'react-icons/bi';

type Props = {
  inputQuery?: string;
  /** input of the input Tag*/
  placeholder?: string;
  setInputQuery?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** callback Function to set the input State */
};

const Searchbar = ({
  inputQuery,
  placeholder,
  setInputQuery,
}: Props) => {
  return (
    <div className="my-4 relative hidden xl:flex items-center bg-transparent text-xs xl:text-base text-gray-900  dark:text-gray-100 w-full border-gray-200 dark:border-gray-700 border rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-search ml-2 xl:ml-4 text-gray-900 dark:text-gray-100"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="10" cy="10" r="7"></circle>
        <line x1="21" y1="21" x2="15" y2="15"></line>
      </svg>
      <input
        placeholder="Search for components"
        id="componentSearch"
        className="w-full focus:outline-none rounded-full px-2 xl:px-4  py-2 xl:py-4 placeholder-gray-900 dark:placeholder-gray-100 dark:bg-transparent"
        value=""
      />
      <label
        htmlFor="headerSearch"
        className="absolute pointer-events-none opacity-0"
      >
        Search
      </label>
    </div>
  );
};

export default Searchbar;
