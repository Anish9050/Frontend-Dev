import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `px-4 py-2 rounded-lg text-sm font-medium transition ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-blue-600 hover:bg-blue-100"
  }`;

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header Navigation */}
      <header className="bg-white shadow-md">
        <nav className="mx-auto max-w-5xl px-4 flex gap-4 py-4">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/users" className={linkClass}>
            Users
          </NavLink>
        </nav>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
