import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./layouts/Layout";

import { MapPage } from "./pages/MapPage";
import VolunteersPage from "./pages/VolunteersPage";
import EventsPage from "./pages/EventsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { PrivateRoute } from "./features/auth/components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/" element={<Layout />}>
          <Route
            path="/volunteers"
            element={
              <PrivateRoute>
                <VolunteersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/events"
            element={
              <PrivateRoute>
                <EventsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/map"
            element={
              <PrivateRoute>
                <MapPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <AnalyticsPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
