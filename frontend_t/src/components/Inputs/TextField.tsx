import React from 'react';

type InputElement = HTMLInputElement | HTMLTextAreaElement;
type InputChangeEvent = React.ChangeEvent<InputElement>;
type TextFieldProps = {
  value: string | undefined;
  onChange: (val: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  name?: string;
  type?: 'email' | 'password' | 'text';
  textarea?: boolean;
  required?: boolean;
  label: string;
};

const TextField = ({
  onChange,
  name,
  textarea = false,
  label,
  ...rest
}: TextFieldProps) => {
  const InputElement = textarea ? 'textarea' : 'input';
  return (
    <div className="relative z-0 w-full mb-8">
      <InputElement
        className='className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"'
        onChange={({ target: { value } }: InputChangeEvent) =>
          onChange(value)
        }
        {...rest}
      />
      <label
        htmlFor={name}
        className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
      >
        {label}
      </label>
    </div>
  );
};

export default TextField;
