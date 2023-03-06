import { BrowserRouter, Route, Routes } from "react-router-dom";
import BuildDen from "./pages/BuildDen";
import Home from "./pages/Home";
import Layout from "./components/Layout";

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={`/`} element={<Home />} />
            <Route path={`/build`} element={<BuildDen />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
