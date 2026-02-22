import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useInventory } from "../context/InventoryContext";
import DashboardStats from "../components/DashboardStats";
import RecentProducts from "../components/RecentProducts";
import CategoryChart from "../components/CategoryChart";
import ValueChart from "../components/ValueChart";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui";
import { TrendingUp } from "lucide-react";
import { useStore } from "../context/useStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Input, Button } from "../components/ui";
import { Play } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { products } = useInventory();
  const { videoUrl, setDashboardVideo } = useStore();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoInput, setVideoInput] = useState(videoUrl || "");

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6 md:space-y-10 pb-8">
      {/* Premium Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12 text-white shadow-2xl border border-slate-700/50">
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 bottom-0 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 space-y-2">
          <p className="text-sm md:text-base text-slate-300 font-medium uppercase tracking-wide">{todayDate}</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
            Welcome back, {user?.storeName}!
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl">
            Here's what's happening with your inventory today
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <div className="h-1 w-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
          Dashboard Overview
        </h2>
        <DashboardStats products={products} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Products - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <RecentProducts products={products} />
        </div>

        {/* Quick Stats Card - Premium Styling */}
        <Card className="h-full bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 border-slate-200/80 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b border-slate-200/50 pb-4">
            <CardTitle className="flex items-center gap-3 text-slate-900">
              <div className="p-2.5 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <div className="space-y-3 p-4 rounded-xl bg-white/60 border border-green-100/50">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Products in Stock</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {products.length}
                </span>
              </div>
              <div className="w-full bg-slate-200/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500 shadow-lg shadow-green-500/30"
                  style={{ width: `${Math.min((products.length / 50) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-white/60 border border-orange-100/50">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Low Stock Items</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {products.filter((p) => p.quantity <= 5).length}
                </span>
              </div>
              <div className="w-full bg-slate-200/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500 shadow-lg shadow-orange-500/30"
                  style={{
                    width: `${Math.min((products.filter((p) => p.quantity <= 5).length / products.length) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid with Premium Styling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="transform hover:scale-[1.02] transition-transform duration-300">
          <CategoryChart products={products} />
        </div>
        <div className="transform hover:scale-[1.02] transition-transform duration-300">
          <ValueChart products={products} />
        </div>
      </div>

      {/* Video & Tips Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Section */}
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200/80 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <CardHeader className="border-b border-slate-200/50 pb-4 bg-gradient-to-r from-slate-50 to-purple-50">
            <CardTitle className="flex items-center gap-3 text-slate-900">
              <div className="p-2.5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                <Play className="h-5 w-5 text-purple-600" />
              </div>
              How to use the app
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {videoUrl ? (
              <div className="relative rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5">
                <div className="aspect-video bg-black">
                  <video src={videoUrl} controls className="w-full h-full object-cover" />
                </div>
              </div>
            ) : (
              <div className="text-center py-16 px-4">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-4">
                  <Play className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-slate-600 font-medium text-lg mb-2">No walkthrough video yet</p>
                <p className="text-slate-500 text-sm mb-6">Add a tutorial video to help users learn your system</p>
                <Button onClick={() => setShowVideoModal(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-shadow">
                  Add Video URL
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pro Tips Section */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-slate-200/80 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b border-slate-200/50 pb-4 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="flex items-center gap-3 text-slate-900">
              <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              Pro Tips & Ideas
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {[
                "Use clear product photos to improve recognition.",
                "Keep categories concise and consistent.",
                "Use low-stock alerts and set reorder points.",
                "Regularly export your data as CSV for backups.",
                "Enable activity history for auditing and tracking."
              ].map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <span className="text-slate-700 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Video URL Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Add dashboard video URL</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Video URL</label>
              <Input 
                value={videoInput} 
                onChange={(e) => setVideoInput(e.target.value)} 
                placeholder="https://...mp4 or embed link" 
                className="border-slate-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowVideoModal(false)}>Cancel</Button>
              <Button 
                onClick={() => { 
                  setDashboardVideo(videoInput); 
                  setShowVideoModal(false); 
                }} 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-shadow"
              >
                Save
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
