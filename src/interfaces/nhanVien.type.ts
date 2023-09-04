import type { TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";

export interface DataType {
  id: number;
  hoVaTen: string;
  canCuocCongDan: string;
  ngaySinh: string;
  gioiTinh: string;
  soDienThoai: string;
  email: string;
  thanhPho: string;
  quanHuyen: string;
  phuongXa: string;
  diaChiCuThe: string;
  anhDaiDien: string;
  ngayTao: string;
  ngaySua: string;
  trangThai: number;
}
export interface ResponseNhanVien {
  taiKhoan: DataType;
}

export interface Sorter {
  field: string;
  order: "ascend" | "descend";
}

export interface DataParams {
  currentPage: number;
  pageSize: number;
  searchText: string;
  filterStatus: string;
  filterGender: string;
  sorter: string;
  sortOrder: string;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
  searchText?: string;
  trangThai?: string;
  gioiTinh?: string;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

// {
//   defaultPageSize: 5,
//   pageSizeOptions: ["5", "10", "20", "50", "100"],
//   // position: ["bottomCenter"],
//   total: totalElements, // Tổng số lượng bản ghi
//   showSizeChanger: true, // Cho phép chọn số bản ghi trên mỗi trang
//   showQuickJumper: false, // Cho phép nhảy đến trang cụ thể
//   onChange(page, pageSize) {
//     setCurrentPage(page);
//     setPageSize(pageSize);
//   },
//   showTotal: (total, range) =>
//     `${range[0]}-${range[1]} of ${total} items`,
// }
