import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./layouts/Layout";

import { MapPage } from "./pages/MapPage";
import Volunteers from "./containers/Volunteers";

function Vol() {
  return (
    <Volunteers/>
  );
}

function Ev() {
  return (
    <div>
      <h1>Event</h1>
    </div>
  );
}


function Analitycs() {
  return (
    <div>
      <h1>Analitycs</h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/volunteers" element={<Vol />} />
          <Route path="/events" element={<Ev />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/analytics" element={<Analitycs />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
