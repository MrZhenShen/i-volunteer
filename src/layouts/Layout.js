import { Outlet } from "react-router-dom";

import NavigationBar from "../containers/NavigationBar";

export function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <NavigationBar />

      <main className="flex flex-col justify-between h-[calc(100dvh-88px-64px-32px)] container mx-auto flex-grow">
        <Outlet />
      </main>

      <footer className="bg-primary-50 py-5 mt-8">
        <div className="container mx-auto">
          <p>© 2024, ДСНС</p>
        </div>
      </footer>
    </div>
  );
}
