import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Input } from "../components/ui";
import { Lock, ArrowLeft } from "lucide-react";

export default function ChangePassword() {
  const { user, updatePassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (formData.oldPassword !== user.password) {
      setError("Current password is incorrect");
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    updatePassword(formData.newPassword);
    setLoading(false);
    toast.success("Password changed successfully");
    navigate("/profile");
  };

  return (
    <div className="px-3 sm:px-4 md:px-6 max-w-md mx-auto space-y-4 md:space-y-6">
      {/* Header */}
      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition text-sm md:text-base"
      >
        <ArrowLeft size={18} className="md:size-20" />
        Back to Profile
      </button>

      {/* Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-1.5 md:p-2 rounded-full">
              <Lock className="h-4 md:h-5 w-4 md:w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg md:text-xl">Change Password</CardTitle>
              <CardDescription className="text-xs md:text-sm">Update your account password</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Current Password</label>
              <Input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Enter your current password"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">New Password</label>
              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password (min 6 characters)"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Security Tip */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900">
            <strong>Security Tip:</strong> Use a strong password with a mix of uppercase, lowercase, numbers, and special characters.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
