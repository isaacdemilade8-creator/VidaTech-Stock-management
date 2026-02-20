import { useState } from "react";
import { useStore } from "../../context/useStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input } from "../../components/ui";
import { Plus, Tag, Ruler, Zap, Building, DollarSign, Package } from "lucide-react";
import { toast } from "react-toastify";

export default function AddProduct() {
  const {
    categories,
    units,
    brands,
    suppliers,
    addProduct,
  } = useStore();

  const initialState = {
    name: "",
    category: "",
    unit: "",
    brand: "",
    supplier: "",
    price: "",
    stock: "",
    image: "",
  };

  const [form, setForm] = useState(initialState);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // handle file upload and image url
  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrl = (e) => {
    const url = e.target.value;
    setForm((prev) => ({ ...prev, image: url }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (!form.category) {
      toast.error("Please select a category");
      return;
    }

    if (!form.unit) {
      toast.error("Please select a unit");
      return;
    }

    if (!form.price) {
      toast.error("Price is required");
      return;
    }

    if (!form.stock && form.stock !== 0) {
      toast.error("Stock quantity is required");
      return;
    }

    const productData = {
      ...form,
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    };

    addProduct(productData);
    toast.success("Product added successfully!");
    setForm(initialState);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Add Product</h1>
        <p className="text-slate-600 mt-1">Create a new product and add it to your inventory</p>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-purple-600" />
            Product Information
          </CardTitle>
          <CardDescription>Fill in all the required fields to add a new product</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Package className="h-4 w-4 text-purple-600" />
                Product Name *
              </label>
              <Input
                name="name"
                placeholder="e.g. Laptop Pro 15, Wireless Mouse"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Row 2: Category and Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-purple-600" />
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-blue-600" />
                  Unit *
                </label>
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Unit</option>
                  {units.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Brand and Supplier */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-600" />
                  Brand
                </label>
                <select
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select Brand</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Building className="h-4 w-4 text-green-600" />
                  Supplier
                </label>
                <select
                  name="supplier"
                  value={form.supplier}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  Price *
                </label>
                <Input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Package className="h-4 w-4 text-slate-600" />
                  Stock Quantity *
                </label>
                <Input
                  type="number"
                  name="stock"
                  placeholder="0"
                  value={form.stock}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
            </div>

            {/* Row 5: Image Upload / URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Image URL</label>
                <Input
                  type="url"
                  name="imageUrl"
                  placeholder="https://example.com/photo.jpg"
                  value={form.image?.startsWith("data:") ? "" : form.image || ""}
                  onChange={handleImageUrl}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Or upload an image</label>
                <input type="file" accept="image/*" onChange={handleImageFile} className="w-full" />
              </div>
            </div>

            {/* Image Preview */}
            {form.image && (
              <div className="p-3 border rounded-lg bg-slate-50">
                <p className="text-sm text-slate-600 mb-2">Image preview</p>
                <img src={form.image} alt="preview" className="w-full max-h-60 object-contain rounded" />
                <div className="mt-2">
                  <Button variant="outline" onClick={() => setForm((p) => ({ ...p, image: "" }))}>
                    Remove Image
                  </Button>
                </div>
              </div>
            )}

            {/* Summary Box */}
            {form.name && form.category && form.price && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Summary:</span> {form.name} | {form.category} | ${Number(form.price).toFixed(2)} | Stock: {form.stock || 0}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 gap-2"
              >
                <Plus size={18} />
                Save Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-600">
          <p>• Create categories first before adding products</p>
          <p>• Set up units to match your product measurements</p>
          <p>• You can add more brands and suppliers anytime</p>
          <p>• Stock quantity can be updated later from the inventory</p>
        </CardContent>
      </Card>
    </div>
  );
}