import { BrowserRouter, Routes, Route } from "react-router-dom";
import Volunteers from "./containers/Volunteers";
import Events from "./containers/Events";
import NavigationBar from "./containers/NavigationBar";

function App() {
  return (
    <BrowserRouter>
    <NavigationBar />
      <Routes>
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
