import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./layouts/Layout";

import { MapPage } from "./pages/MapPage";
import VolunteersPage from "./pages/VolunteersPage";
import EventsPage from "./pages/EventsPage";

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
          <Route path="/volunteers" element={<VolunteersPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/analytics" element={<Analitycs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
