import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { getVehicles } from "../../../services/authService";

const Vehicles = () => {
    const { t } = useTranslation();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getVehicles();
            if (response.data.status === 200) {
                const normalizedVehicles = response.data.data
                    .filter((vehicle) => vehicle.status)
                    .map((vehicle) => ({
                        ...vehicle,
                        vehicle_name: vehicle.vehicle_name || "",
                        description: vehicle.description || "",
                        status: vehicle.status || "",
                    }));
                setVehicles(normalizedVehicles);
            } else {
                message.error("Failed to fetch vehicles");
            }
        } catch (error) {
            message.error("Error fetching vehicles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddVehicle = async (values) => {
        // Xử lý thêm mới xe
    };

    const handleEditVehicle = async (values) => {
        // Xử lý chỉnh sửa xe
    };

    const handleDeleteVehicle = async (vehicleId) => {
        // Xử lý xóa xe
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredVehicles = vehicles.filter(
        (vehicle) =>
            vehicle.vehicle_name
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            vehicle.description
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            vehicle.status?.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: t("Vehicle ID"),
            dataIndex: "vehicle_id",
        },
        {
            title: t("Vehicle Name"),
            dataIndex: "vehicle_name",
        },
        {
            title: t("Description"),
            dataIndex: "description",
        },
        {
            title: t("Status"),
            dataIndex: "status",
        },
        {
            title: t("Action"),
            render: (_, record) => (
                <>
                    <Button onClick={() => openEditModal(record)} type="link">
                        {t("Edit")}
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this vehicle?"
                        onConfirm={() => handleDeleteVehicle(record.vehicle_id)}
                    >
                        <Button type="link" danger>
                            {t("Delete")}
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const openEditModal = (vehicle) => {
        setEditingVehicle(vehicle);
        setIsModalVisible(true);
        form.setFieldsValue(vehicle);
    };

    const openAddModal = () => {
        setEditingVehicle(null);
        setIsModalVisible(true);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <div>
            <div style={{ marginBottom: 20, display: "flex", gap: "10px" }}>
                <Button type="primary" onClick={openAddModal}>
                    {t("Add")}
                </Button>
                <Input
                    placeholder={t("Search")}
                    value={searchText}
                    onChange={handleSearch}
                    style={{ width: "100%" }}
                />
            </div>
            <Table
                columns={columns}
                dataSource={filteredVehicles}
                rowKey="vehicle_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingVehicle ? t("Edit") : t("Add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                style={{ textAlign: "center" }}
            >
                <Form
                    form={form}
                    onFinish={
                        editingVehicle ? handleEditVehicle : handleAddVehicle
                    }
                    style={{ width: "100%" }}
                >
                    <Form.Item
                        label={t("Vehicle Name")}
                        name="vehicle_name"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the vehicle name!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Description")}
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the description!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={t("Status")} name="status">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingVehicle ? t("Update") : t("Add")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Vehicles;
