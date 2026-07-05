import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTaskCount(res.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 ml-56 p-10">
        <h1 className="text-4xl font-bold text-blue-700">
          Welcome, {user.name} 👋
        </h1>

        <p className="text-gray-500 mt-2">{user.email}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg">📊 Total Tasks</h3>
            <p className="text-4xl font-bold mt-3">{taskCount}</p>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg">✅ Completed</h3>
            <p className="text-4xl font-bold mt-3">0</p>
          </div>

          <div className="bg-orange-500 text-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg">⏳ Pending</h3>
            <p className="text-4xl font-bold mt-3">{taskCount}</p>
          </div>

        </div>

        <div className="mt-10 flex gap-4">

          <button
            onClick={() => navigate("/tasks")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            📋 Open Task Manager
          </button>

          <button
            onClick={logout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            🚪 Logout
          </button>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;