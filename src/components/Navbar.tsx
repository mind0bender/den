import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

interface NavLink {
  name: string;
  path: string;
}

const navLinks: NavLink[] = [
  {
    name: "build",
    path: "/build",
  },
  {
    name: "gather",
    path: "/gather",
  },
];

const Navbar: FC = (): JSX.Element => {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [myScrollY, setMyScrollY] = useState<number>(window.scrollY);

  useEffect((): (() => void) => {
    const handleScroll: () => void = (): void => {
      setMyScrollY(scrollY);

      const scrollPer: number =
        ((window.innerHeight + window.scrollY) * 100) /
        document.body.scrollHeight;

      setScrollPercent(scrollPer);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return (): void => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full sticky top-0 left-0 bg-indigo-400 ${
        myScrollY ? "bg-opacity-75" : ""
      } duration-300`}>
      <nav
        className={`flex h-full ${
          myScrollY ? "py-2" : "py-4"
        } backdrop-blur-sm border-slate-900 duration-300 shadow-md w-full justify-between items-center px-6`}>
        <NavLink
          to={"/"}
          className={({ isActive }): string =>
            `decoration-wavy text-2xl uppercase font-bold ${
              isActive && `underline`
            }`
          }>
          Den
        </NavLink>
        <ul className={`flex gap-4`}>
          {navLinks.map((navLink: NavLink, idx: number): JSX.Element => {
            return (
              // providing the index is ok because navLinks never changes
              <li key={idx}>
                <NavLink
                  to={navLink.path}
                  className={({ isActive }): string =>
                    `text-lg decoration-wavy uppercase font-bold ${
                      isActive && `underline`
                    }`
                  }>
                  {navLink.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={`bg-indigo-500`}>
        <div
          style={{
            width: `${scrollPercent}%`,
          }}
          className={`h-1 bg-indigo-500 flex justify-end duration-300`}>
          <div
            className={`h-full w-10 bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-500`}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
