import { useState } from "react";
import { useStore } from "../../context/useStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui";
import { Plus, Trash2, Zap, Edit3 } from "lucide-react";
import { toast } from "react-toastify";

const Brands = () => {
  const { brands, addBrand, deleteBrand, updateBrand } = useStore();
  const [name, setName] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a brand name");
      return;
    }

    if (editingId) {
      updateBrand(editingId, name);
      toast.success(`Brand "${name}" updated!`);
      setEditingId(null);
    } else {
      addBrand(name);
      toast.success(`Brand "${name}" added!`);
    }
    setName("");
    setShowDialog(false);
  };

  function openEdit(b) {
    setEditingId(b.id);
    setName(b.name);
    setShowDialog(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Brands</h1>
          <p className="text-slate-600 mt-1">Manage product brands and manufacturers</p>
        </div>
        <Button onClick={() => setShowDialog(true)} className="gap-2">
          <Plus size={18} />
          Add Brand
        </Button>
      </div>

      {/* Content Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-600" />
            Product Brands
          </CardTitle>
          <CardDescription>Total: {brands.length} brands</CardDescription>
        </CardHeader>
        <CardContent>
          {brands.length === 0 ? (
            <div className="text-center py-12">
              <Zap className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">No brands yet</p>
              <p className="text-slate-400 text-sm">Add your first brand to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="group relative p-4 border-2 border-slate-200 rounded-lg hover:border-amber-400 hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition">
                        <Zap className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{brand.name}</p>
                        <p className="text-xs text-slate-500">ID: {brand.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(brand)} className="p-2 hover:bg-slate-100 rounded-lg transition opacity-0 group-hover:opacity-100">
                        <Edit3 className="h-5 w-5 text-slate-700" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${brand.name}?`)) {
                            deleteBrand(brand.id);
                            toast.success("Brand deleted");
                          }
                        }}
                        className="p-2 hover:bg-red-100 rounded-lg transition opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-600" />
              Add New Brand
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddBrand} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Brand Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Apple, Samsung, Nike"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-amber-600 to-orange-600">
                Add Brand
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Brands;