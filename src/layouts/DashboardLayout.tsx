import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Stations",
    path: "/stations",
  },
  {
    name: "Employees",
    path: "/employees",
  },
  {
    name: "Leave-Types",
    path: "/leave-types",
  },
  {
    name: "Shifts",
    path: "/shifts",
  },
  {
    name: "Duty Charts",
    path: "/duty-charts",
  },
];

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="h-16 border-b border-slate-200 bg-white">
        <div className="flex h-full items-center px-6">
          <h1 className="text-xl font-bold text-slate-800">
            Duty Chart System
          </h1>
        </div>
      </header>

      <div className="flex">
        <aside className="min-h-[calc(100vh-4rem)] w-64 bg-slate-900">
          <div className="p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Main Menu
            </p>

            <nav className="space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;