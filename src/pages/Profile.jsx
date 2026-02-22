import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useInventory } from "../context/InventoryContext";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui";
import { Badge } from "../components/ui";
import { Upload, Lock, LogOut, Calendar, Mail } from "lucide-react";

export default function Profile() {
  const { user, updateProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar);
  const { history } = useInventory();
  const [activeTab, setActiveTab] = useState("account");
  const [showEditModal, setShowEditModal] = useState(false);

  const [formData, setFormData] = useState({
    storeName: user?.storeName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    website: user?.website || "",
    role: user?.role || "Store Owner",
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      updateProfile({ avatar: reader.result });
      toast.success("Avatar updated");
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setShowEditModal(false);
    toast.success("Profile updated successfully");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="space-y-1 md:space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">User Profile</h1>
        <p className="text-xs md:text-sm text-slate-600">Manage your account settings and preferences</p>
      </div>

      {/* Avatar Card */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100">
        <CardContent className="pt-4 md:pt-6">
          <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
            <div className="relative">
              <img
                src={avatarPreview || "https://via.placeholder.com/120"}
                alt="Avatar"
                className="w-24 md:w-28 h-24 md:h-28 rounded-full object-cover shadow-lg border-4 border-white"
              />
              <label className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-1.5 md:p-2 rounded-full cursor-pointer hover:shadow-lg transition">
                <Upload size={16} className="md:size-18" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-slate-900">{user.storeName}</h2>
              <p className="text-xs md:text-sm text-slate-600">{user.role || "Store Owner"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-0">
          {[
            { id: "account", label: "Account Settings" },
            { id: "history", label: "Activity History" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Account Tab */}
      {activeTab === "account" && (
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View and manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Store Info */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Store Name</label>
                <p className="text-lg text-slate-900 mt-1 font-semibold">{user.storeName}</p>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Mail size={16} />
                  Email Address
                </label>
                <p className="text-lg text-slate-900 mt-1">{user.email}</p>
              </div>
              {user.phone && (
                <div>
                  <label className="text-sm font-medium text-slate-700">Phone</label>
                  <p className="text-lg text-slate-900 mt-1">{user.phone}</p>
                </div>
              )}
              {user.website && (
                <div>
                  <label className="text-sm font-medium text-slate-700">Website</label>
                  <p className="text-lg text-slate-900 mt-1">{user.website}</p>
                </div>
              )}
              {user.lastLogin && (
                <div>
                  <label className="text-sm font-medium text-slate-700">Last Login</label>
                  <p className="text-slate-600 mt-1">{new Date(user.lastLogin).toLocaleString()}</p>
                </div>
              )}
              {user.createdAt && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Calendar size={16} />
                    Member Since
                  </label>
                  <p className="text-slate-600 mt-1">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button onClick={() => setShowEditModal(true)}>Edit Profile</Button>
            <NavLink to="/change-password">
              <Button variant="outline" className="gap-2">
                <Lock size={16} />
                Change Password
              </Button>
            </NavLink>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="ml-auto gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <Card>
          <CardHeader>
            <CardTitle>Activity History</CardTitle>
            <CardDescription>Your recent inventory actions</CardDescription>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500">No activity yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.map((h) => (
                  <div
                    key={h.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{h.name}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        {h.action} • Quantity: {h.quantity}
                      </p>
                    </div>
                    <Badge variant="outline">{h.date}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Profile Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Store Name</label>
              <Input
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                required
                placeholder="Enter store name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone</label>
                <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 555 555 5555" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Website</label>
                <Input name="website" value={formData.website} onChange={handleChange} placeholder="https://example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Role</label>
              <Input name="role" value={formData.role} onChange={handleChange} placeholder="Store Owner" />
            </div>
            <DialogFooter className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
