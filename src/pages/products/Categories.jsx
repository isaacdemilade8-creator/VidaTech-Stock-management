import { useState } from "react";
import { useStore } from "../../context/useStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui";
import { Plus, Trash2, Tag, Edit3 } from "lucide-react";
import { toast } from "react-toastify";

export default function Categories() {
  const { categories, addCategory, deleteCategory, updateCategory } = useStore();
  const [name, setName] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    if (editingId) {
      updateCategory(editingId, name);
      toast.success(`Category "${name}" updated!`);
      setEditingId(null);
    } else {
      addCategory(name);
      toast.success(`Category "${name}" added!`);
    }
    setName("");
    setShowDialog(false);
  };

  function openEdit(cat) {
    setEditingId(cat.id);
    setName(cat.name);
    setShowDialog(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">Categories</h1>
          <p className="text-sm md:text-base text-slate-600 mt-1">Organize your products by category</p>
        </div>
        <Button onClick={() => setShowDialog(true)} className="w-full sm:w-auto gap-2">
          <Plus size={18} />
          Add Category
        </Button>
      </div>

      {/* Content Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-purple-600" />
            Product Categories
          </CardTitle>
          <CardDescription>Total: {categories.length} categories</CardDescription>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">No categories yet</p>
              <p className="text-slate-400 text-sm">Create your first category to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="group relative p-4 border-2 border-slate-200 rounded-lg hover:border-purple-400 hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition">
                        <Tag className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{cat.name}</p>
                        <p className="text-xs text-slate-500">ID: {cat.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(cat)} className="p-2 hover:bg-slate-100 rounded-lg transition opacity-0 group-hover:opacity-100">
                        <Edit3 className="h-5 w-5 text-slate-700" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${cat.name}?`)) {
                            deleteCategory(cat.id);
                            toast.success("Category deleted");
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
              <Tag className="h-5 w-5 text-purple-600" />
              Add New Category
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Category Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Electronics, Clothing, Food"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                Add Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
