import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./layouts/Layout";

import { MapPage } from "./pages/MapPage";
import VolunteersPage from "./pages/VolunteersPage";
import EventsPage from "./pages/EventsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/volunteers" element={<VolunteersPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
