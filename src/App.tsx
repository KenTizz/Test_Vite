import { Routes, Route } from "react-router-dom";
import IndexNhanVien from "./pages/admin/nhan-vien/index";
import ViewAddNhanVien from "./pages/admin/nhan-vien/view_add";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="nhan-vien" element={<IndexNhanVien />} />
        <Route path="nhan-vien/view-add" element={<ViewAddNhanVien />} />
      </Route>
    </Routes>
  );
}

export default App;
