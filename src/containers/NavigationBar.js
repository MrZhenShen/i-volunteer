import { Outlet, Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/event">Event</Link>
          </li>
          <li>
            <Link to="/volunteer">Volunteer</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default NavigationBar;