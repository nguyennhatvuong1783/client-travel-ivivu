import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { getAccommodations } from "../../../services/authService";

const Accommodations = () => {
    const { t } = useTranslation();
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingAccommodation, setEditingAccommodation] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getAccommodations();
            if (response.data.status === 200) {
                const normalizedAccommodations = response.data.data
                    .filter((accommodation) => accommodation.status)
                    .map((accommodation) => ({
                        ...accommodation,
                        name: accommodation.name || "",
                        address: accommodation.address || "",
                        description: accommodation.description || "",
                        rating: accommodation.rating || 0,
                        type: accommodation.type || "",
                    }));
                setAccommodations(normalizedAccommodations);
            } else {
                message.error("Failed to fetch accommodations");
            }
        } catch (error) {
            message.error("Error fetching accommodations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddAccommodation = async (values) => {
        // Xử lý thêm mới accommodation
    };

    const handleEditAccommodation = async (values) => {
        // Xử lý chỉnh sửa accommodation
    };

    const handleDeleteAccommodation = async (accommodationId) => {
        // Xử lý xóa accommodation
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredAccommodations = accommodations.filter(
        (accommodation) =>
            accommodation.name
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            accommodation.address
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            accommodation.description
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            accommodation.type
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            accommodation.rating?.toString().includes(searchText)
    );

    const columns = [
        {
            title: t("Name"),
            dataIndex: "name",
        },
        {
            title: t("Address"),
            dataIndex: "address",
        },
        {
            title: t("Description"),
            dataIndex: "description",
        },
        {
            title: t("Rating"),
            dataIndex: "rating",
        },
        {
            title: t("Type"),
            dataIndex: "type",
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
                        title="Are you sure you want to delete this accommodation?"
                        onConfirm={() =>
                            handleDeleteAccommodation(record.accommodation_id)
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

    const openEditModal = (accommodation) => {
        setEditingAccommodation(accommodation);
        setIsModalVisible(true);
        form.setFieldsValue(accommodation);
    };

    const openAddModal = () => {
        setEditingAccommodation(null);
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
                dataSource={filteredAccommodations}
                rowKey="accommodation_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingAccommodation ? t("Edit") : t("Add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                style={{ textAlign: "center" }}
            >
                <Form
                    form={form}
                    onFinish={
                        editingAccommodation
                            ? handleEditAccommodation
                            : handleAddAccommodation
                    }
                    style={{ width: "100%" }}
                >
                    <Form.Item
                        label={t("Name")}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the name!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Address")}
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the address!"),
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
                    <Form.Item
                        label={t("Rating")}
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the rating!"),
                            },
                        ]}
                    >
                        <Input type="number" min={1} max={5} />
                    </Form.Item>
                    <Form.Item
                        label={t("Type")}
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the type!"),
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
                            {editingAccommodation ? t("Update") : t("Add")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Accommodations;
