import { useState } from "react";
import { useStore } from "../../context/useStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui";
import { Plus, Trash2, Ruler, Edit3 } from "lucide-react";
import { toast } from "react-toastify";

export default function Units() {
  const { units, addUnit, deleteUnit, updateUnit } = useStore();
  const [newUnit, setNewUnit] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newUnit.trim()) {
      toast.error("Please enter a unit name");
      return;
    }

    if (editingId) {
      updateUnit(editingId, newUnit);
      toast.success(`Unit "${newUnit}" updated!`);
      setEditingId(null);
    } else {
      addUnit(newUnit);
      toast.success(`Unit "${newUnit}" added!`);
    }
    setNewUnit("");
    setShowDialog(false);
  };

  function openEdit(u) {
    setEditingId(u.id);
    setNewUnit(u.name);
    setShowDialog(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Units</h1>
          <p className="text-slate-600 mt-1">Manage product measurement units</p>
        </div>
        <Button onClick={() => setShowDialog(true)} className="gap-2">
          <Plus size={18} />
          Add Unit
        </Button>
      </div>

      {/* Content Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-blue-600" />
            Measurement Units
          </CardTitle>
          <CardDescription>Total: {units.length} units</CardDescription>
        </CardHeader>
        <CardContent>
          {units.length === 0 ? (
            <div className="text-center py-12">
              <Ruler className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">No units added yet</p>
              <p className="text-slate-400 text-sm">Create units like pcs, kg, liters, etc.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {units.map((unit) => (
                <div
                  key={unit.id}
                  className="group relative p-4 border-2 border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition">
                        <Ruler className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{unit.name}</p>
                        <p className="text-xs text-slate-500">ID: {unit.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(unit)} className="p-2 hover:bg-slate-100 rounded-lg transition opacity-0 group-hover:opacity-100">
                        <Edit3 className="h-5 w-5 text-slate-700" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${unit.name}?`)) {
                            deleteUnit(unit.id);
                            toast.success("Unit deleted");
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
              <Ruler className="h-5 w-5 text-blue-600" />
              Add New Unit
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Unit Name</label>
              <Input
                type="text"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                placeholder="e.g. pcs, kg, liters, meters"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                Add Unit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}