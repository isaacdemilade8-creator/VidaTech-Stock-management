import { useState } from "react";
import { useStore } from "../../context/useStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui";
import { Plus, Trash2, Building, Edit3 } from "lucide-react";
import { toast } from "react-toastify";

export default function Suppliers() {
  const { suppliers, addSupplier, deleteSupplier, updateSupplier } = useStore();
  const [newSupplier, setNewSupplier] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);

  function handleAdd(e) {
    e.preventDefault();
    if (!newSupplier.trim()) {
      toast.error("Please enter a supplier name");
      return;
    }

    if (editingId) {
      updateSupplier(editingId, newSupplier);
      toast.success(`Supplier "${newSupplier}" updated!`);
      setEditingId(null);
    } else {
      addSupplier(newSupplier);
      toast.success(`Supplier "${newSupplier}" added!`);
    }
    setNewSupplier("");
    setShowDialog(false);
  }

  function openEdit(s) {
    setEditingId(s.id);
    setNewSupplier(s.name);
    setShowDialog(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Suppliers</h1>
          <p className="text-slate-600 mt-1">Manage your product suppliers</p>
        </div>
        <Button onClick={() => setShowDialog(true)} className="gap-2">
          <Plus size={18} />
          Add Supplier
        </Button>
      </div>

      {/* Content Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-green-600" />
            Supplier List
          </CardTitle>
          <CardDescription>Total: {suppliers.length} suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          {suppliers.length === 0 ? (
            <div className="text-center py-12">
              <Building className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">No suppliers added</p>
              <p className="text-slate-400 text-sm">Add suppliers to manage your product sources</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="group relative p-4 border-2 border-slate-200 rounded-lg hover:border-green-400 hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition">
                        <Building className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{supplier.name}</p>
                        <p className="text-xs text-slate-500">ID: {supplier.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(supplier)} className="p-2 hover:bg-slate-100 rounded-lg transition opacity-0 group-hover:opacity-100">
                        <Edit3 className="h-5 w-5 text-slate-700" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${supplier.name}?`)) {
                            deleteSupplier(supplier.id);
                            toast.success("Supplier deleted");
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
              <Building className="h-5 w-5 text-green-600" />
              Add New Supplier
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Supplier Name</label>
              <Input
                type="text"
                value={newSupplier}
                onChange={(e) => setNewSupplier(e.target.value)}
                placeholder="e.g. Acme Corporation, Global Distributors"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-green-600 to-emerald-600">
                Add Supplier
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}