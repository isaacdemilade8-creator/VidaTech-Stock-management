import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
// import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetails";
import HistoryPage from "./pages/HistoryPage"
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsLayout from "./pages/products/ProductsLayout";
import ProductList from "./pages/products/ProductList";
import Categories from "./pages/products/Categories";
import Units from "./pages/products/Units";
import BaseUnits from "./pages/products/BaseUnits";
import Variants from "./pages/products/Variants";
import Stock from "./pages/products/Stock";
import Suppliers from "./pages/products/Suppliers";
import Sales from "./pages/products/Sales";
import Purchases from "./pages/products/Purchases";
import AddProduct from "./pages/products/AddProduct";
import Brands from "./pages/products/Brands";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:name" element={<CategoryDetails />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="/products" element={<ProductsLayout />}>

              <Route index element={<ProductList />} />

              <Route path="list" element={<ProductList />} />
              <Route path="categories" element={<Categories />} />
              <Route path="units" element={<Units />} />
              <Route path="base-units" element={<BaseUnits />} />
              <Route path="variants" element={<Variants />} />
              <Route path="stock" element={<Stock />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="sales" element={<Sales />} />
              <Route path="purchases" element={<Purchases />} />
              <Route path="add" element={<AddProduct />} />
              <Route path="brands" element={<Brands />} />

            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}
