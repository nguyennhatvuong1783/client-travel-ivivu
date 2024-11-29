import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { getActivities } from "../../../services/authService";

const Activities = () => {
    const { t } = useTranslation();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingActivity, setEditingActivity] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getActivities();
            if (response.data.status === 200) {
                const normalizedActivities = response.data.data
                    .filter((activity) => activity.status)
                    .map((activity) => ({
                        ...activity,
                        name: activity.name || "",
                        description: activity.description || "",
                        duration: activity.duration || "",
                        difficulty_level: activity.difficulty_level || "",
                    }));
                setActivities(normalizedActivities);
            } else {
                message.error("Failed to fetch activities");
            }
        } catch (error) {
            message.error("Error fetching activities");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddActivity = async (values) => {
        // Xử lý thêm mới activity
    };

    const handleEditActivity = async (values) => {
        // Xử lý chỉnh sửa activity
    };

    const handleDeleteActivity = async (activityId) => {
        // Xử lý xóa activity
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredActivities = activities.filter(
        (activity) =>
            activity.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            activity.description
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            activity.duration?.toString().includes(searchText) ||
            activity.difficulty_level
                ?.toLowerCase()
                .includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: t("Name"),
            dataIndex: "name",
        },
        {
            title: t("Description"),
            dataIndex: "description",
        },
        {
            title: t("Duration"),
            dataIndex: "duration",
        },
        {
            title: t("Difficulty Level"),
            dataIndex: "difficulty_level",
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
                        title="Are you sure you want to delete this activity?"
                        onConfirm={() =>
                            handleDeleteActivity(record.activity_id)
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

    const openEditModal = (activity) => {
        setEditingActivity(activity);
        setIsModalVisible(true);
        form.setFieldsValue(activity);
    };

    const openAddModal = () => {
        setEditingActivity(null);
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
                dataSource={filteredActivities}
                rowKey="activity_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingActivity ? t("Edit") : t("Add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                style={{ textAlign: "center" }}
            >
                <Form
                    form={form}
                    onFinish={
                        editingActivity ? handleEditActivity : handleAddActivity
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
                        label={t("Duration")}
                        name="duration"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the duration!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Difficulty Level")}
                        name="difficulty_level"
                        rules={[
                            {
                                required: true,
                                message: t(
                                    "Please input the difficulty level!"
                                ),
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
                            {editingActivity ? t("Update") : t("Add")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Activities;
