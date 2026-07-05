import Sidebar from "../components/Sidebar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 ml-56 p-10">
        <div className="max-w-lg bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">
            👤 My Profile
          </h1>

          <div className="space-y-4">
            <div>
              <p className="text-gray-500">Name</p>
              <h2 className="text-xl font-semibold">{user.name}</h2>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <h2 className="text-xl font-semibold">{user.email}</h2>
            </div>

            <div>
              <p className="text-gray-500">Application</p>
              <h2 className="text-xl font-semibold">Kael Lite</h2>
            </div>

            <div>
              <p className="text-gray-500">Role</p>
              <h2 className="text-xl font-semibold">User</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;