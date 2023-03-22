import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import BuildDen from "./pages/BuildDen";
import Home from "./pages/Home";
import Gather from "./pages/Gather";
import { useEffect } from "react";
import { GROUP_CHART_DATA_IMG } from "./constants";
import Den from "./pages/Den";
import { action as newDen } from "./routes/new";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={`/`} element={<Home />} />
      <Route path={`/build`} element={<BuildDen />} />
      <Route path={`/build/new`} action={newDen} />
      <Route path={`/gather`} element={<Gather />} />
      <Route path={`/den/:denId`} element={<Den />} />
    </Route>
  )
);

function App(): JSX.Element {
  useEffect((): (() => void) => {
    console.log(
      "welcome to\n%cDEN",
      `background:url("${GROUP_CHART_DATA_IMG}"); background-size:cover; padding-top:2rem; padding-bottom:2rem; padding-left:3.25rem; padding-right:3.25rem; font-weight:800; font-style:UI-monospace, monospace; color:black;`
    );

    return (): void => {};
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
