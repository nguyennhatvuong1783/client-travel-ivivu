import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Popconfirm,
    message,
    DatePicker,
} from "antd";
import { getPromotions } from "../../../services/authService";

const Promotions = () => {
    const { t } = useTranslation();
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingPromotion, setEditingPromotion] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getPromotions();
            if (response.data.status === 200) {
                const normalizedPromotions = response.data.data
                    .filter((promotion) => promotion.status)
                    .map((promotion) => ({
                        ...promotion,
                        code: promotion.code || "",
                        description: promotion.description || "",
                        discount_percentage: promotion.discount_percentage || 0,
                        start_date: promotion.start_date || "",
                        end_date: promotion.end_date || "",
                        discount_type: promotion.discount_type || "",
                    }));
                setPromotions(normalizedPromotions);
            } else {
                message.error("Failed to fetch promotions");
            }
        } catch (error) {
            message.error("Error fetching promotions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddPromotion = async (values) => {
        // Xử lý thêm mới promotion
    };

    const handleEditPromotion = async (values) => {
        // Xử lý chỉnh sửa promotion
    };

    const handleDeletePromotion = async (promotionId) => {
        // Xử lý xóa promotion
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredPromotions = promotions.filter(
        (promotion) =>
            promotion.code?.toLowerCase().includes(searchText.toLowerCase()) ||
            promotion.description
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            promotion.discount_type
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            promotion.discount_percentage?.toString().includes(searchText)
    );

    const columns = [
        {
            title: t("Promotion Code"),
            dataIndex: "code",
        },
        {
            title: t("Description"),
            dataIndex: "description",
        },
        {
            title: t("Discount Percentage"),
            dataIndex: "discount_percentage",
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
            title: t("Discount Type"),
            dataIndex: "discount_type",
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
                        title="Are you sure you want to delete this promotion?"
                        onConfirm={() =>
                            handleDeletePromotion(record.promotion_id)
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

    const openEditModal = (promotion) => {
        setEditingPromotion(promotion);
        setIsModalVisible(true);
        form.setFieldsValue(promotion);
    };

    const openAddModal = () => {
        setEditingPromotion(null);
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
                dataSource={filteredPromotions}
                rowKey="promotion_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingPromotion ? t("Edit") : t("Add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                style={{ textAlign: "center" }}
            >
                <Form
                    form={form}
                    onFinish={
                        editingPromotion
                            ? handleEditPromotion
                            : handleAddPromotion
                    }
                    style={{ width: "100%" }}
                >
                    <Form.Item
                        label={t("Promotion Code")}
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the promotion code!"),
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
                        label={t("Discount Percentage")}
                        name="discount_percentage"
                        rules={[
                            {
                                required: true,
                                message: t(
                                    "Please input the discount percentage!"
                                ),
                            },
                        ]}
                    >
                        <Input type="number" />
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
                        <DatePicker style={{ width: "100%" }} />
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
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        label={t("Discount Type")}
                        name="discount_type"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the discount type!"),
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
                            {editingPromotion ? t("Update") : t("Add")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Promotions;
