import { useState } from "react";
import { useStore } from "../../context/useStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui";
import { Plus, ShoppingCart, DollarSign } from "lucide-react";
import { toast } from "react-toastify";

export default function Sales() {
  const { sales, addSale } = useStore();
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({
    product: "",
    quantity: "",
    price: "",
    date: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.product || !form.quantity || !form.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    addSale({
      ...form,
      id: Date.now(),
      total: Number(form.quantity) * Number(form.price),
    });

    toast.success("Sale recorded successfully!");
    setForm({ product: "", quantity: "", price: "", date: "" });
    setShowDialog(false);
  }

  const totalSalesValue = sales ? sales.reduce((sum, s) => sum + Number(s.total || 0), 0) : 0;
  const totalSalesCount = sales ? sales.length : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Sales</h1>
          <p className="text-slate-600 mt-1">Track and manage your sales transactions</p>
        </div>
        <Button onClick={() => setShowDialog(true)} className="gap-2">
          <Plus size={18} />
          Record Sale
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Sales</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{totalSalesCount}</p>
              </div>
              <ShoppingCart className="h-10 w-10 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Revenue</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">${totalSalesValue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-10 w-10 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales List Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            Sales Records
          </CardTitle>
          <CardDescription>All recorded sales transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {!sales || sales.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">No sales recorded</p>
              <p className="text-slate-400 text-sm">Start recording sales to see them here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sales.map((s) => (
                <div
                  key={s.id}
                  className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{s.product}</p>
                      <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                        <div className="bg-slate-50 p-2 rounded">
                          <p className="text-slate-600">Quantity</p>
                          <p className="font-semibold text-slate-900">{s.quantity}</p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded">
                          <p className="text-slate-600">Unit Price</p>
                          <p className="font-semibold text-slate-900">${s.price}</p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded border border-blue-200">
                          <p className="text-blue-600">Total</p>
                          <p className="font-semibold text-blue-900">${s.total?.toFixed(2)}</p>
                        </div>
                      </div>
                      {s.date && (
                        <p className="text-xs text-slate-500 mt-2">Date: {new Date(s.date).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Sale Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              Record New Sale
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Product Name *</label>
              <Input
                type="text"
                name="product"
                placeholder="e.g. Laptop, Monitor, Keyboard"
                value={form.product}
                onChange={handleChange}
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Quantity *</label>
                <Input
                  type="number"
                  name="quantity"
                  placeholder="1"
                  value={form.quantity}
                  onChange={handleChange}
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Unit Price *</label>
                <Input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Date</label>
              <Input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            {form.quantity && form.price && (
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Total Amount:</span> ${(Number(form.quantity) * Number(form.price)).toFixed(2)}
                </p>
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                Record Sale
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}