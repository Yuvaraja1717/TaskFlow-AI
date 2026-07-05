import { useState } from "react";
import api from "../services/api";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const res = await api.post("/auth/signup", form);
      alert(res.data.message);
    } catch (err: any) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f4f4",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          width: "350px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2>Create Account</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={{ width: "100%", padding: 10, marginBottom: 20 }}
        />

        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            padding: 12,
            background: "#2563eb",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;