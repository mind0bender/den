import { ChangeEventHandler, FC, HTMLInputTypeAttribute, useId } from "react";

interface InputProps {
  value?: string | number | readonly string[];
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<InputProps> = ({
  value,
  label,
  placeholder,
  type = "text",
  onChange,
}: InputProps): JSX.Element => {
  const id: string = useId();

  return (
    <label
      className={`flex pt-[.4rem] bg-indigo-50 relative flex-col-reverse focus-within:ring-4 rounded-md ring-white ring-opacity-50 duration-200`}>
      <input
        onChange={onChange}
        value={value}
        aria-labelledby={`${label}-label-${id}`}
        placeholder={placeholder}
        type="text"
        className={`bg-indigo-50 outline-none border-none peer/${label} focus:placeholder:text-transparent rounded-md px-2 py-1`}
      />
      <div
        id={`${label}-label-${id}`}
        className={`text-xs absolute font-bold px-4 rounded-md top-0 w-full text-transparent peer-focus/${label}:text-indigo-500 duration-200`}>
        {placeholder}
      </div>
    </label>
  );
};

export default Input;
