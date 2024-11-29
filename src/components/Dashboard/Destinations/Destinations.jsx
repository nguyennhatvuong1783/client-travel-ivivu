import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { getDestinations } from "../../../services/authService";

const Destinations = () => {
    const { t } = useTranslation();
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingDestination, setEditingDestination] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getDestinations();
            if (response.data.status === 200) {
                const normalizedDestinations = response.data.data
                    .filter((destination) => destination.status)
                    .map((destination) => ({
                        ...destination,
                        id: destination.id || "",
                        name: destination.name || "",
                        best_time_to_visit:
                            destination.best_time_to_visit || "",
                        climate: destination.climate || "",
                        country: destination.country || "",
                        description: destination.description || "",
                    }));
                setDestinations(normalizedDestinations);
            } else {
                message.error("Failed to fetch destinations");
            }
        } catch (error) {
            message.error("Error fetching destinations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddDestination = async (values) => {
        // Xử lý thêm mới destination
    };

    const handleEditDestination = async (values) => {
        // Xử lý chỉnh sửa destination
    };

    const handleDeleteDestination = async (destinationId) => {
        // Xử lý xóa destination
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredDestinations = destinations.filter(
        (destination) =>
            destination.name
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            destination.country
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            destination.climate
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            destination.best_time_to_visit
                ?.toLowerCase()
                .includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: t("Destination ID"),
            dataIndex: "id",
        },
        {
            title: t("Destination Name"),
            dataIndex: "name",
        },
        {
            title: t("Best Time to Visit"),
            dataIndex: "best_time_to_visit",
        },
        {
            title: t("Climate"),
            dataIndex: "climate",
        },
        {
            title: t("Country"),
            dataIndex: "country",
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
                        title="Are you sure you want to delete this destination?"
                        onConfirm={() =>
                            handleDeleteDestination(record.destination_id)
                        }
                    >
                        <Button type="link" danger>
                            {t("Delete")}
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const openEditModal = (destination) => {
        setEditingDestination(destination);
        setIsModalVisible(true);
        form.setFieldsValue(destination);
    };

    const openAddModal = () => {
        setEditingDestination(null);
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
                dataSource={filteredDestinations}
                rowKey="destination_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingDestination ? t("Edit") : t("Add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                style={{ textAlign: "center" }}
            >
                <Form
                    form={form}
                    onFinish={
                        editingDestination
                            ? handleEditDestination
                            : handleAddDestination
                    }
                    style={{ width: "100%" }}
                >
                    <Form.Item
                        label={t("Destination Name")}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: t(
                                    "Please input the destination name!"
                                ),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Best Time to Visit")}
                        name="best_time_to_visit"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={t("Climate")} name="climate">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Country")}
                        name="country"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the country!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={t("Description")} name="description">
                        <Input />
                    </Form.Item>
                    <Form.Item label={t("Status")} name="status">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingDestination ? t("Update") : t("Add")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Destinations;
