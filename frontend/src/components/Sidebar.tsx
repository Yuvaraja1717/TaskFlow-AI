import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: "🏠", path: "/dashboard" },
    { name: "Tasks", icon: "✅", path: "/tasks" },
    { name: "AI Chat", icon: "🤖", path: "/chat" },
    { name: "Profile", icon: "👤", path: "/profile" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white shadow-xl">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-blue-400">
          Kael Lite
        </h1>

        <p className="text-sm text-gray-400 mt-2">
          Smart Task Manager
        </p>
      </div>

      <div className="mt-6 px-4">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg mb-3 transition-all ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`}
          >
            <span className="text-xl">{item.icon}</span>

            <span className="text-lg">{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-6 left-0 w-full px-4">
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">Version</p>
          <h2 className="font-bold text-blue-400">v1.0</h2>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;