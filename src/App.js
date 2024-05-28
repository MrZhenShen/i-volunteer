import { BrowserRouter, Routes, Route } from "react-router-dom";
import Volunteer from "./containers/Volunteer";
import Event from "./containers/Event";
import NavigationBar from "./containers/NavigationBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route path="/volunteers" element={<Volunteer />} />
          <Route path="/events" element={<Event />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
