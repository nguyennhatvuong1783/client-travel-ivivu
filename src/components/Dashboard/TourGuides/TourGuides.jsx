import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { getTourGuides } from "../../../services/authService";

const TourGuides = () => {
    const { t } = useTranslation();
    const [tourGuides, setTourGuides] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingGuide, setEditingGuide] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getTourGuides();
            if (response.data.status === 200) {
                const normalizedTourGuides = response.data.data
                    .filter((guide) => guide.status)
                    .map((guide) => ({
                        ...guide,
                        email: guide.email || "",
                        experience: guide.experience || "",
                        languages: guide.languages || "",
                        full_name: guide.full_name || "",
                        phone_number: guide.phone_number || "",
                        status: guide.status || "",
                    }));
                setTourGuides(normalizedTourGuides);
            } else {
                message.error("Failed to fetch tour guides");
            }
        } catch (error) {
            message.error("Error fetching tour guides");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddGuide = async (values) => {
        // Xử lý thêm mới hướng dẫn viên
    };

    const handleEditGuide = async (values) => {
        // Xử lý chỉnh sửa hướng dẫn viên
    };

    const handleDeleteGuide = async (guideId) => {
        // Xử lý xóa hướng dẫn viên
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredTourGuides = tourGuides.filter(
        (guide) =>
            guide.full_name?.toLowerCase().includes(searchText.toLowerCase()) ||
            guide.email?.toLowerCase().includes(searchText.toLowerCase()) ||
            guide.phone_number
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            guide.languages?.toLowerCase().includes(searchText.toLowerCase()) ||
            guide.experience
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            guide.status?.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: t("Guide ID"),
            dataIndex: "guide_id",
        },
        {
            title: t("Full Name"),
            dataIndex: "full_name",
        },
        {
            title: t("Email"),
            dataIndex: "email",
        },
        {
            title: t("Phone Number"),
            dataIndex: "phone_number",
        },
        {
            title: t("Experience"),
            dataIndex: "experience",
        },
        {
            title: t("Languages"),
            dataIndex: "languages",
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
                        title="Are you sure you want to delete this tour guide?"
                        onConfirm={() => handleDeleteGuide(record.guide_id)}
                    >
                        <Button type="link" danger>
                            {t("Delete")}
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const openEditModal = (guide) => {
        setEditingGuide(guide);
        setIsModalVisible(true);
        form.setFieldsValue(guide);
    };

    const openAddModal = () => {
        setEditingGuide(null);
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
                dataSource={filteredTourGuides}
                rowKey="guide_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingGuide ? t("Edit") : t("Add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                style={{ textAlign: "center" }}
            >
                <Form
                    form={form}
                    onFinish={editingGuide ? handleEditGuide : handleAddGuide}
                    style={{ width: "100%" }}
                >
                    <Form.Item
                        label={t("Full Name")}
                        name="full_name"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the full name!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Email")}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the email!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Phone Number")}
                        name="phone_number"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the phone number!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Experience")}
                        name="experience"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the experience!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Languages")}
                        name="languages"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the languages!"),
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
                            {editingGuide ? t("Update") : t("Add")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TourGuides;
