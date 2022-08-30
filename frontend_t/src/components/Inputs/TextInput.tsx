import React, { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value?: string | number;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rest?: any;
  title: string;
  name: string;
}

const TextInput: React.FC<Props> = ({
  value,
  changeHandler,
  name,
  title,
  ...rest
}) => {
  return (
    <div className="relative z-0 mb-6 w-full ">
      <input
        value={value}
        onChange={changeHandler}
        {...rest}
        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:primary focus:outline-none focus:ring-0 focus:primary peer"
      />
      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {title}
      </label>
    </div>
  );
};
export default TextInput;
