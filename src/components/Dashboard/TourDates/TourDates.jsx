import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { getTourDates } from "../../../services/authService";

const TourDates = () => {
    const { t } = useTranslation();
    const [tourDates, setTourDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingTourDate, setEditingTourDate] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getTourDates();
            if (response.data.status === 200) {
                const normalizedTourDates = response.data.data
                    .filter((tourDate) => tourDate.status)
                    .map((tourDate) => ({
                        ...tourDate,
                        package_name: tourDate.package_name || "",
                        start_date: tourDate.start_date || "",
                        end_date: tourDate.end_date || "",
                        available_spots: tourDate.available_spots || 0,
                    }));
                setTourDates(normalizedTourDates);
            } else {
                message.error("Failed to fetch tour dates");
            }
        } catch (error) {
            message.error("Error fetching tour dates");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddTourDate = async (values) => {
        // Xử lý thêm mới tour date
    };

    const handleEditTourDate = async (values) => {
        // Xử lý chỉnh sửa tour date
    };

    const handleDeleteTourDate = async (tourDateId) => {
        // Xử lý xóa tour date
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredTourDates = tourDates.filter(
        (tourDate) =>
            tourDate.package_name
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            tourDate.start_date
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            tourDate.end_date
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            tourDate.available_spots?.toString().includes(searchText)
    );

    const columns = [
        {
            title: t("Package Name"),
            dataIndex: "package_name",
        },
        {
            title: t("Start Date"),
            dataIndex: "start_date",
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: t("End Date"),
            dataIndex: "end_date",
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: t("Available Spots"),
            dataIndex: "available_spots",
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
                        title="Are you sure you want to delete this tour date?"
                        onConfirm={() =>
                            handleDeleteTourDate(record.tour_date_id)
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

    const openEditModal = (tourDate) => {
        setEditingTourDate(tourDate);
        setIsModalVisible(true);
        form.setFieldsValue(tourDate);
    };

    const openAddModal = () => {
        setEditingTourDate(null);
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
                dataSource={filteredTourDates}
                rowKey="tour_date_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingTourDate ? t("Edit") : t("Add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                style={{ textAlign: "center" }}
            >
                <Form
                    form={form}
                    onFinish={
                        editingTourDate ? handleEditTourDate : handleAddTourDate
                    }
                    style={{ width: "100%" }}
                >
                    <Form.Item
                        label={t("Package Name")}
                        name="package_name"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the package name!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Start Date")}
                        name="start_date"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the start date!"),
                            },
                        ]}
                    >
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item
                        label={t("End Date")}
                        name="end_date"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the end date!"),
                            },
                        ]}
                    >
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item
                        label={t("Available Spots")}
                        name="available_spots"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the available spots!"),
                            },
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label={t("Status")} name="status">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingTourDate ? t("Update") : t("Add")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TourDates;
