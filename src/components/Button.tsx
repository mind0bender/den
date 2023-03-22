import { FC, MouseEventHandler, ReactNode } from "react";

export type ButtonTypes = "button" | "submit" | "reset";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonTypes;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type,
}: ButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex flex-col-reverse hover:ring-4 active:ring-4 ring-indigo-300 duration-200 text-white font-bold w-fit bg-indigo-600 outline-none border-none rounded-md px-4 py-2 ${className}`}>
      {children}
    </button>
  );
};

export default Button;
