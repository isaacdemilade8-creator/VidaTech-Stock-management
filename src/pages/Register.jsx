import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Basic validation
    if (!storeName || !email || !password) return alert("Fill all fields");

    // Save in localStorage (simulate backend)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email))
      return alert("Email already exists");

    const newUser = { storeName, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    login(storeName, email); // login immediately
    navigate("/"); // go to dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-200 via-fuchsia-400 to-indigo-300">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Store</h2>

        <input
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="Store Name"
          className="w-full h-12 px-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-300 transition-all duration-200 placeholder:text-gray-500 placeholder:text-base mt-5 mb-5"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Owner Email"
          className="w-full h-12 px-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-300 transition-all duration-200 placeholder:text-gray-500 placeholder:text-base mt-5 mb-5"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full h-12 px-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-300 transition-all duration-200 placeholder:text-gray-500 placeholder:text-base mt-5 mb-5"
        />

        <button className="w-full h-16 bg-gradient-to-br from-rose-200 via-fuchsia-400 to-indigo-300 rounded-md text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:border-2 hover:border-red-500">
          Register
        </button>
      </form>
    </div>
  );
}
