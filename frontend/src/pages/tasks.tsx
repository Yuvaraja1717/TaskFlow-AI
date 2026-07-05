import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await api.post("/tasks", {
        title,
        priority,
      });

      setTitle("");
      setPriority("Medium");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async () => {
    try {
      await api.put(`/tasks/${editingId}`, {
        title: editTitle,
      });

      setEditingId(null);
      setEditTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCompleted = async (task: Task) => {
    try {
      await api.put(`/tasks/complete/${task.id}`, {
        completed: !task.completed,
      });

      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
                <h1 className="text-4xl font-bold text-blue-700 mb-8">
          📋 Task Manager
        </h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6">
            <p className="text-lg">📊 Total Tasks</p>
            <h2 className="text-4xl font-bold mt-3">
              {tasks.length}
            </h2>
          </div>

          <div className="bg-green-600 text-white rounded-xl shadow-lg p-6">
            <p className="text-lg">✅ Completed</p>
            <h2 className="text-4xl font-bold mt-3">
              {completedTasks}
            </h2>
          </div>

          <div className="bg-orange-500 text-white rounded-xl shadow-lg p-6">
            <p className="text-lg">⏳ Pending</p>
            <h2 className="text-4xl font-bold mt-3">
              {pendingTasks}
            </h2>
          </div>

        </div>

        {/* Add Task Card */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-5">
            ➕ Add New Task
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task..."
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border border-gray-300 rounded-lg p-3"
            >
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>

            <button
              onClick={addTask}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Add Task
            </button>

          </div>

        </div>

        {/* Search */}

        <div className="mb-8">

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search Tasks..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Task List */}

        <div className="space-y-4">

          {filteredTasks.length === 0 ? (

            <div className="bg-white rounded-xl shadow-lg p-10 text-center">

              <h2 className="text-2xl font-bold text-gray-500">
                No Tasks Found
              </h2>

              <p className="text-gray-400 mt-2">
                Add your first task to get started.
              </p>

            </div>

          ) : (

            filteredTasks.map((task) => (              <div
                key={task.id}
                className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">

                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(task)}
                    className="w-5 h-5"
                  />

                  {editingId === task.id ? (

                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border rounded-lg p-2"
                    />

                  ) : (

                    <div>

                      <p
                        className={`text-lg font-semibold ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </p>

                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm text-white ${
                          task.priority === "High"
                            ? "bg-red-500"
                            : task.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      >
                        {task.priority}
                      </span>

                    </div>

                  )}

                </div>

                <div className="flex gap-2">

                  {editingId === task.id ? (

                    <button
                      onClick={updateTask}
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                    >
                      Save
                    </button>

                  ) : (

                    <>
                      <button
                        onClick={() => {
                          setEditingId(task.id);
                          setEditTitle(task.title);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </>

                  )}

                </div>

              </div>
            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Tasks;