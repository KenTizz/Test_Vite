import React, { useState, useEffect } from "react";
import { fetchData } from "~/api/apiNhanVien";
import {
  Space,
  Card,
  Tag,
  Form,
  Input,
  Button,
  Dropdown,
  Select,
  Avatar,
  Col,
  Row,
  Divider,
  Slider,
  Table,
} from "antd";
import type { MenuProps } from "antd";
import { GrMoreVertical } from "react-icons/gr";
import { Link } from "react-router-dom";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import {
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReadOutlined,
  ManOutlined,
  WomanOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  formatNgaySinh,
  formatPhoneNumber,
  calculateAge,
} from "../../../utils/formatResponse";
import { DataType, TableParams } from "../../../interfaces/nhanVien.type";
import Sider from "antd/es/layout/Sider";

const index: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const getParams = (params: TableParams) => ({
    currentPage: params.pagination?.current,
    pageSize: params.pagination?.pageSize,
    searchText: params.searchText,
    trangThai: params.trangThai,
    gioiTinh: params.gioiTinh,
    sortField: params.sortField,
    sortOrder: params.sortOrder,
    gioiTinhList: params.filters?.gioiTinh,
  });
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      key: "stt",
      fixed: "left",
      align: "center",
      rowScope: "row",
      width: 60,
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Ảnh",
      key: "stt",
      fixed: "left",
      align: "center",
      width: 80,
      render: () => (
        <Avatar src="" shape="square" size="large" icon={<UserOutlined />} />
      ),
    },
    {
      title: "Họ và Tên",
      dataIndex: "hoVaTen",
      fixed: "left",
      key: "hoVaTen",
      sorter: true,
      // ellipsis: true,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "CMT/CCCD",
      dataIndex: "canCuocCongDan",
      key: "canCuocCongDan",
      sorter: true,
    },
    {
      title: "Ngày Sinh",
      align: "center",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      sorter: true,
      render: (ngaySinh) => formatNgaySinh(ngaySinh),
    },
    {
      title: "Giới Tính",
      dataIndex: "gioiTinh",
      align: "center",
      sorter: true,
      key: "gioiTinh",
      filters: [
        { text: "Nam", value: "MALE" },
        { text: "Nữ", value: "FEMALE" },
        { text: "Khác", value: "OTHER" },
      ],
      render: (gioiTinh) => {
        const genderInfo: Record<string, { icon: JSX.Element; color: string }> =
          {
            MALE: { icon: <ManOutlined />, color: gioiTinh.mauSac },
            FEMALE: { icon: <WomanOutlined />, color: gioiTinh.mauSac },
            OTHER: { icon: <UserOutlined />, color: gioiTinh.mauSac },
          };
        const { icon, color } = genderInfo[gioiTinh.ten];
        return (
          <Tag bordered={false} icon={icon} color={color}>
            {gioiTinh.moTa}
          </Tag>
        );
      },
    },
    {
      title: "Số Điện Thoại",
      align: "center",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
      sorter: true,
      render: (soDienThoai) => formatPhoneNumber(soDienThoai),
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      sorter: true,

      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: "Trạng Thái",
      dataIndex: "trangThai",
      key: "trangThai",
      sorter: true,
      render: (trangThai) =>
        trangThai == 1 ? (
          <Tag color="success">Kích hoạt</Tag>
        ) : (
          <Tag color="error">Ngừng kích hoạt</Tag>
        ),
    },
    {
      title: "Thao Tác",
      dataIndex: "id",
      fixed: "right",
      align: "center",
      key: "id",
      width: 90,
      render: (id) => {
        const actionItems: MenuProps["items"] = [
          {
            icon: <ReadOutlined />,
            label: <Link to={`/admin/nhan-vien/view/${id}`}>Xem chi tiết</Link>,
            key: "0",
          },
          {
            icon: <EditOutlined />,
            label: <Link to={`/admin/nhan-vien/edit/${id}`}>Chỉnh sửa</Link>,
            key: "1",
          },
          {
            type: "divider",
          },
          {
            icon: <DeleteOutlined />,
            danger: true,
            label: (
              <Link to={`/admin/nhan-vien/status/${id}`}>Hủy kích hoạt</Link>
            ),
            key: "3",
          },
        ];

        return (
          <Dropdown menu={{ items: actionItems }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Button
                  type="text"
                  icon={
                    <GrMoreVertical
                      style={{ fontSize: "20", color: "#bfbfbf" }}
                    />
                  }
                />
              </Space>
            </a>
          </Dropdown>
        );
      },
    },
  ];
  useEffect(() => {
    const fetchDataAndLoadData = async () => {
      setLoading(true);
      const fetchedData = await fetchData(getParams(tableParams));
      setData(fetchedData.content);
      setCurrentPage(fetchedData.pageable.pageNumber + 1);
      setPageSize(fetchedData.pageable.pageSize);
      setLoading(false);
      const updatedTableParams = {
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          showSizeChanger: true,
          total: fetchedData.totalElements,
          showTotal: (total: number, range: [number, number]) =>
            `${range[0]}-${range[1]} of ${total} items`,
        },
      };

      // Kiểm tra xem tableParams thực sự đã thay đổi
      if (JSON.stringify(updatedTableParams) !== JSON.stringify(tableParams)) {
        setTableParams(updatedTableParams);
      }
    };

    fetchDataAndLoadData();
    console.log(tableParams);
  }, [tableParams]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>, // Đổi kiểu dữ liệu của filters
    sorter: SorterResult<DataType> | SorterResult<DataType>[]
  ) => {
    const sortField = Array.isArray(sorter)
      ? (sorter[0].field || "").toString()
      : (sorter.field || "").toString();
    const sortOrder = Array.isArray(sorter)
      ? (sorter[0].order || "").toString()
      : (sorter.order || "").toString();

    // Loại bỏ các giá trị null khỏi filters
    const cleanedFilters: Record<string, FilterValue> = {};
    for (const key in filters) {
      if (filters[key] !== null) {
        cleanedFilters[key] = filters[key] as FilterValue;
      }
    }

    setTableParams({
      ...tableParams,
      pagination,
      sortField,
      sortOrder,
      filters: cleanedFilters, // Sử dụng cleanedFilters thay vì filters ban đầu
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
    console.log(cleanedFilters);
  };

  const handleSearch = (searchValue: string) => {
    // setSearchText(searchValue);
    setTableParams({
      ...tableParams,
      searchText: searchValue,
    });
  };
  const onChangeGender = (value: string) => {
    console.log(value);

    setTableParams({
      ...tableParams,
      gioiTinh: value,
    });
  };
  const onChangeStatus = (value: string) => {
    console.log(value);

    setTableParams({
      ...tableParams,
      trangThai: value,
    });
  };
  return (
    <>
      <Card title="QUẢN LÝ NHÂN VIÊN" bordered={true}>
        <Row>
          <Col span={8}>
            <Input
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Tìm kiếm theo Tên, SĐT, Email, CMT/CCCD,..."
              allowClear
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            />
          </Col>
          <Col span={4}></Col>
          <Col span={9}>
            <Space>
              <Form.Item
                label="Giới tính"
                style={{ fontWeight: "bold", marginLeft: 15 }}
              >
                <Select
                  defaultValue=""
                  style={{ width: 90 }}
                  onChange={onChangeGender}
                  options={[
                    { value: "", label: "Tất cả" },
                    { value: "MALE", label: "Nam" },
                    { value: "FEMALE", label: "Nữ" },
                    { value: "OTHER", label: "Khác" },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Trạng thái" style={{ fontWeight: "bold" }}>
                <Select
                  defaultValue=""
                  style={{ width: 150 }}
                  onChange={onChangeStatus}
                  options={[
                    { value: "", label: "Tất cả" },
                    { value: "1", label: "Kích hoạt" },
                    { value: "0", label: "Ngừng kích hoạt" },
                  ]}
                />
              </Form.Item>
            </Space>
          </Col>
          <Col span={3}>
            <Button type="primary" icon={<UserAddOutlined />}>
              <Link to="/admin/nhan-vien/view-add">Thêm nhân viên</Link>
            </Button>
          </Col>
        </Row>
        <Divider>Danh Sách Nhân Viên</Divider>
        <Table
          pagination={tableParams.pagination}
          columns={columns}
          dataSource={data.map((item, index) => ({
            ...item,
            key: index.toString(),
          }))}
          loading={loading}
          onChange={handleTableChange}
          showSorterTooltip={false}
          scroll={{ y: 400 }}
        />
      </Card>
    </>
  );
};

export default index;
