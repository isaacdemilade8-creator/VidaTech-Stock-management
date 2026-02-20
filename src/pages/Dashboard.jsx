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
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">
          Welcome back, {user?.storeName}!
        </h1>
        <p className="text-slate-600">{todayDate}</p>
      </div>

      {/* Stats Grid */}
      <DashboardStats products={products} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Products - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <RecentProducts products={products} />
        </div>

        {/* Quick Stats Card */}
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Products in Stock</span>
                <span className="text-2xl font-bold text-slate-900">
                  {products.length}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                  style={{ width: `${Math.min((products.length / 50) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Low Stock Items</span>
                <span className="text-2xl font-bold text-orangered-600">
                  {products.filter((p) => p.quantity <= 5).length}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                  style={{
                    width: `${Math.min((products.filter((p) => p.quantity <= 5).length / products.length) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart products={products} />
        <ValueChart products={products} />
      </div>

      {/* Video / Help Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-purple-600" />
              How to use the app
            </CardTitle>
          </CardHeader>
          <CardContent>
            {videoUrl ? (
              <div className="aspect-video bg-black rounded overflow-hidden">
                <video src={videoUrl} controls className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500">No walkthrough video set yet.</p>
                <div className="mt-4">
                  <Button onClick={() => setShowVideoModal(true)}>Add Video URL</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ideas / Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Pro Tips & Ideas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <ul className="list-disc pl-5">
              <li>Use clear product photos to improve recognition.</li>
              <li>Keep categories concise and consistent.</li>
              <li>Use low-stock alerts and set reorder points.</li>
              <li>Regularly export your data as CSV for backups.</li>
              <li>Enable activity history for auditing and tracking.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Video URL Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add dashboard video URL</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input value={videoInput} onChange={(e) => setVideoInput(e.target.value)} placeholder="https://...mp4 or embed link" />
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowVideoModal(false)}>Cancel</Button>
              <Button onClick={() => { setDashboardVideo(videoInput); setShowVideoModal(false); }} className="bg-gradient-to-r from-purple-600 to-blue-600">Save</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
