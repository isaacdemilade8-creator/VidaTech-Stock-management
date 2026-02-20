import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { Button } from "../components/ui";
import { Input } from "../components/ui";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui";
import { UserPlus } from "lucide-react";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    storeName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.storeName || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    // Check if email exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === formData.email)) {
      setError("Email already registered");
      setLoading(false);
      return;
    }

    // Register user via AuthContext
    try {
      register(formData.storeName, formData.email, formData.password);
    } catch (err) {
      setError(err.message || "Registration failed");
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-full">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Create Store</CardTitle>
          <CardDescription>Start managing your inventory today</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
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
                placeholder="My Awesome Store"
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Confirm Password</label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-2"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-teal-600 hover:text-teal-700 font-semibold transition-colors"
            >
              Sign in
            </NavLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
