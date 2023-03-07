import { BrowserRouter, Route, Routes } from "react-router-dom";
import BuildDen from "./pages/BuildDen";
import Home from "./pages/Home";
import Gather from "./pages/Gather";
import { useEffect } from "react";
import { GROUP_CHART_DATA_IMG } from "./constants";
import Den from "./pages/Den";

function App(): JSX.Element {
  useEffect((): (() => void) => {
    console.log(
      "welcome to\n%cDEN",
      `background:url("${GROUP_CHART_DATA_IMG}"); background-size:cover; padding-top:2rem; padding-bottom:2rem; padding-left:3.25rem; padding-right:3.25rem; font-weight:800; font-style:UI-monospace, monospace; color:black;`
    );

    return (): void => {};
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/build`} element={<BuildDen />} />
          <Route path={`/gather`} element={<Gather />} />
          <Route path={`/den/:denId`} element={<Den />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
