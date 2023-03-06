import { FC, ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={`flex flex-col w-full min-h-screen bg-indigo-50 font-mono`}>
      <Navbar />
      <div className={`w-full flex flex-col grow`}>{children}</div>
    </div>
  );
};

export default Layout;
