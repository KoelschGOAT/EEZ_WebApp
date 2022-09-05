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
};
const Input = ({
  label,
  value,
  name,
  type = 'text',
  onChange,
  textarea,

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
        {...rest}
        id={name}
        type={type}
        value={value}
        onChange={({ target: { value } }: InputChangeEvent) =>
          onChange(value)
        }
        className="bg-base-100 border border-gray-300  text-sm text-gray-800 placeholder-primary rounded-lg focus:border-accent focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  );
};

export default Input;
