import { useState, useEffect } from "react";
import { useInventory } from "../context/InventoryContext";
import InventoryGrid from "../components/InventoryGrid";
import AddProductModal from "../components/AddProductModal";
import InventoryFilter from "../components/InventoryFilter";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Input } from "../components/ui";
import CountUp from "react-countup";
import { Plus, Search } from "lucide-react";

export default function Inventory() {
  const { products, addProduct, updateProduct, deleteProduct } = useInventory();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleAdd = (product) => {
    addProduct(product);
    toast.success(`${product.name} added!`);
    setShowAddModal(false);
  };

  const handleRestock = (id) => {
    const item = products.find((p) => p.id === id);
    if (!item) return;
    updateProduct({ ...item, quantity: item.quantity + 5 });
    toast.info(`${item.name} restocked +5`);
  };

  const handleSell = (id) => {
    const item = products.find((p) => p.id === id);
    if (!item) return;
    updateProduct({ ...item, quantity: Math.max(item.quantity - 1, 0) });
    toast.info(`${item.name} sold -1`);
  };

  const handleDelete = (id) => {
    const item = products.find((p) => p.id === id);
    if (!item) return;
    if (!window.confirm(`Delete ${item.name}?`)) return;
    deleteProduct(id);
    toast.error(`${item.name} deleted!`);
  };

  const handleUpdate = (updatedProduct) => {
    updateProduct(updatedProduct);
    toast.success(`${updatedProduct.name} updated!`);
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    setFilteredProducts(
      products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleFilter = (filter) => {
    let filtered = [...products];
    if (filter === "low") filtered = filtered.filter((p) => p.quantity <= 10);
    if (filter === "high") filtered = filtered.filter((p) => p.quantity > 10);
    setFilteredProducts(filtered);
  };

  const totalQuantity = products.reduce((acc, p) => acc + p.quantity, 0);
  const totalValue = products.reduce((acc, p) => acc + p.quantity * p.price, 0);

  const statCards = [
    { label: "Total Products", value: products.length, color: "bg-blue-50", textColor: "text-blue-700" },
    { label: "Total Quantity", value: totalQuantity, color: "bg-purple-50", textColor: "text-purple-700" },
    { label: "Total Value", value: `₦${totalValue.toFixed(2)}`, color: "bg-emerald-50", textColor: "text-emerald-700", isPrice: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Inventory</h1>
          <p className="text-slate-600 mt-1">Track and manage your inventory items</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="gap-2">
          <Plus size={18} />
          Add Product
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className={stat.color}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.isPrice ? stat.value : <CountUp end={stat.value} duration={1.5} />}
              </div>
              <Badge variant="success" className="mt-3 text-xs">↑ 12%</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  handleFilter("all");
                  setSearchTerm("");
                  setFilteredProducts(products);
                }}
              >
                All
              </Button>
              <Button
                variant="outline"
                onClick={() => handleFilter("low")}
              >
                Low Stock
              </Button>
              <Button
                variant="outline"
                onClick={() => handleFilter("high")}
              >
                In Stock
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Grid */}
      <InventoryGrid
        products={filteredProducts}
        onRestock={handleRestock}
        onSell={handleSell}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal
          onAdd={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
