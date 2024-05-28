import { NavLink } from "react-router-dom";
import Icon from "../components/Icon";
import avatar from "../assets/avatar.png";

const NavigationBar = () => {
  const linkStyle = "text-primary-400 hover:text-gray-800 flex items-center py-1 px-2 gap-2";
  const linkActive = "bg-primary-50 rounded-md";
  const linkIconBoxStyle = "bg-primary-50 p-0.5 rounded";
  const linkIconStyle = "w-5 h-5";

  return (
    <nav className="bg-white shadow-md">
      <div className="px-8 py-6 flex justify-between items-center w-full">
        <div className="flex items-center">
          <NavLink to="/" className="ml-4 text-2xl font-bold text-primary-400">
            Я—ДОБРОВОЛЕЦЬ
          </NavLink>
        </div>
        <div className="flex space-x-4 gap-12">
          <NavLink
            to="/map"
            className={({ isActive }) => isActive ? `${linkStyle} ${linkActive}` : linkStyle}
          >
            <div className={linkIconBoxStyle}>
              <Icon name="Map" className={linkIconStyle} />
            </div>
            Мапа
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) => isActive ? `${linkStyle} ${linkActive}` : linkStyle}
          >
            <div className={linkIconBoxStyle}>
              <Icon name="Event" className={linkIconStyle} />
            </div>
            Події
          </NavLink>
          <NavLink
            to="/volunteers"
            className={({ isActive }) => isActive ? `${linkStyle} ${linkActive}` : linkStyle}
          >
            <div className={linkIconBoxStyle}>
              <Icon name="Helmet" className={linkIconStyle} />
            </div>
            Добровольці
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) => isActive ? `${linkStyle} ${linkActive}` : linkStyle}
          >
            <div className={linkIconBoxStyle}>
              <Icon name="Analytics" className={linkIconStyle} />
            </div>
            Аналітика
          </NavLink>
        </div>
        <div className="flex items-center gap-4">
          <Icon name="Settings" className="w-5 h-5 text-primary-400" />
          <div className="flex items-center gap-2">
            <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
            <span className="text-primary-400 text-base leading-6">
              Іван Іваненко
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
