import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./layouts/Layout";

import { MapPage } from "./pages/MapPage";
import VolunteersPage from "./pages/VolunteersPage";
import AnalyticsPage from './pages/AnalyticsPage';

function Ev() {
  return (
    <div>
      <h1>Event</h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/volunteers" element={<VolunteersPage />} />
          <Route path="/events" element={<Ev />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
