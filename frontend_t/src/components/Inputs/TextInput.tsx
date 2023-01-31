import { ComponentProps, forwardRef } from 'react';
import { FieldError } from './Form';

interface Props extends ComponentProps<'input'> {
  label: string;
}

export const TextInput = forwardRef<HTMLInputElement, Props>(
  function Input({ label, type = 'text', ...props }, ref) {
    const ttype = type;
    return (
      <label>
        <div className="font-medium  mb-1 text-left">{label}</div>
        <input
          className={`${
            ttype == 'checkbox'
              ? 'checkbox checkbox-primary '
              : 'w-full px-4 py-2'
          }  bg-white rounded-md border focus:border-brand-600 focus:ring-brand-500 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20`}
          type={type}
          ref={ref}
          {...props}
        />

        <FieldError name={props.name} />
      </label>
    );
  }
);
