import { useStore } from "../../context/useStore";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Input, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

export default function ProductList() {
  const { products, deleteProduct, addProduct, updateProduct } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleDelete = (id) => {
    if (!confirm("Delete this product?")) return;
    deleteProduct(id);
    toast.success("Product deleted");
  };

  function openEdit(product) {
    setEditing({ ...product });
    setShowEdit(true);
  }

  function saveEdit(e) {
    e.preventDefault();
    if (!editing) return;
    updateProduct(editing.id, { name: editing.name, price: Number(editing.price), quantity: Number(editing.quantity) });
    setShowEdit(false);
    toast.success("Product updated");
  }

  const handleAddDemo = () => {
    const demo = {
      id: Date.now(),
      name: "Sample Product " + Math.floor(Math.random() * 100),
      price: 5000,
      quantity: 20,
      image: "https://via.placeholder.com/300",
    };
    addProduct(demo);
    toast.success("Demo product added");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-600 mt-1">Manage and organize your inventory items</p>
        </div>
        <Button onClick={handleAddDemo}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search products by name..."
              className="pl-10 py-6 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {products.length === 0 && (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <p className="text-slate-500 text-lg">No products yet. Add one to get started 🚀</p>
          </CardContent>
        </Card>
      )}

      {/* Grid */}
      {filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full flex flex-col overflow-hidden">
                {/* Image */}
                <div className="h-40 bg-slate-100 flex items-center justify-center overflow-hidden border-b">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-sm">No Image</span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-base truncate text-slate-900">
                    {product.name}
                  </h3>

                  <Badge variant="outline" className="w-fit mt-2 text-xs">
                    ₦{product.price}
                  </Badge>

                  <div className="mt-2 mb-4 flex-1">
                    <p className="text-sm text-slate-600">
                      Stock: <span className="font-semibold text-slate-900">{product.quantity}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => openEdit(product)}
                    >
                      <Pencil size={14} className="mr-1" />
                      Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-red-600">
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editing && (
            <form onSubmit={saveEdit} className="space-y-4">
              <div>
                <label className="text-sm text-slate-700">Name</label>
                <Input value={editing.name} onChange={(e) => setEditing((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-700">Price</label>
                <Input type="number" value={editing.price} onChange={(e) => setEditing((p) => ({ ...p, price: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-700">Quantity</label>
                <Input type="number" value={editing.quantity} onChange={(e) => setEditing((p) => ({ ...p, quantity: e.target.value }))} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowEdit(false)}>Cancel</Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">Save</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* No Results */}
      {filteredProducts.length === 0 && products.length > 0 && (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <p className="text-slate-500">No products match &quot;{searchTerm}&quot;</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
