type InputElement = HTMLInputElement | HTMLTextAreaElement;
type InputChangeEvent = React.ChangeEvent<InputElement>;
type Props = {
  label: string;
  name: string;
  type?: string;
  onChange: (val: string) => void;
  value: string | undefined;
  required?: true;
  textarea?: boolean;
  placeholder?: string;
};
const Input = ({
  label,
  value,
  name,
  type = 'text',
  onChange,
  textarea,
  placeholder,
  ...rest
}: Props) => {
  const InputElement = textarea ? 'textarea' : 'input';
  return (
    <div className="relative z-0 w-full mb-8">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-primary "
      >
        {label}
      </label>
      <InputElement
        id={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={({ target: { value } }: InputChangeEvent) =>
          onChange(value)
        }
        className="bg-base-100 border border-gray-300  text-sm text-gray-800 placeholder-primary rounded-lg focus:border-accent focus:border-blue-500 block w-full p-2.5"
        {...rest}
      />
    </div>
  );
};

export default Input;
