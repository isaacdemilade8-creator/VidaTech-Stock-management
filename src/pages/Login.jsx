import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { Button } from "../components/ui";
import { Input } from "../components/ui";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui";
import { LogIn } from "lucide-react";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    storeName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        u.email === formData.email &&
        u.password === formData.password &&
        u.storeName === formData.storeName
    );

    if (!user) {
      setError("Invalid store name, email, or password");
      setLoading(false);
      return;
    }

    login(user.storeName, user.email, user.password);
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 sm:p-4">
      <Card className="w-full max-w-sm md:max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-3 md:mb-4">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 md:p-3 rounded-full">
              <LogIn className="h-5 md:h-6 w-5 md:w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl md:text-2xl">Welcome Back</CardTitle>
          <CardDescription className="text-xs md:text-sm">Sign in to your inventory store</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Store Name</label>
              <Input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                placeholder="Your store name"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="owner@example.com"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              Create account
            </NavLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
