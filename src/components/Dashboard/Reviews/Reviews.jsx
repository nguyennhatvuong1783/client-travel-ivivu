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
    Rate,
} from "antd";
import { getReviews } from "../../../services/authService";

const Reviews = () => {
    const { t } = useTranslation();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getReviews();
            if (response.data.status === 200) {
                const normalizedReviews = response.data.data
                    .filter((review) => review.status)
                    .map((review) => ({
                        ...review,
                        comment: review.comment || "",
                        rating: review.rating || 0,
                        package_name: review.package_name || "",
                        user_name: review.user_name || "",
                        review_date: review.review_date || "",
                    }));
                setReviews(normalizedReviews);
            } else {
                message.error("Failed to fetch reviews");
            }
        } catch (error) {
            message.error("Error fetching reviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddReview = async (values) => {
        // Xử lý thêm mới review
    };

    const handleEditReview = async (values) => {
        // Xử lý chỉnh sửa review
    };

    const handleDeleteReview = async (reviewId) => {
        // Xử lý xóa review
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredReviews = reviews.filter(
        (review) =>
            review.comment?.toLowerCase().includes(searchText.toLowerCase()) ||
            review.package_name
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            review.user_name
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            review.rating?.toString().includes(searchText)
    );

    const columns = [
        {
            title: t("Review ID"),
            dataIndex: "review_id",
        },
        {
            title: t("Comment"),
            dataIndex: "comment",
        },
        {
            title: t("Rating"),
            dataIndex: "rating",
            render: (rating) => <Rate disabled value={rating} />,
        },
        {
            title: t("Package Name"),
            dataIndex: "package_name",
        },
        {
            title: t("User Name"),
            dataIndex: "user_name",
        },
        {
            title: t("Review Date"),
            dataIndex: "review_date",
            render: (date) => new Date(date).toLocaleDateString(),
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
                        title="Are you sure you want to delete this review?"
                        onConfirm={() => handleDeleteReview(record.review_id)}
                    >
                        <Button type="link" danger>
                            {t("Delete")}
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const openEditModal = (review) => {
        setEditingReview(review);
        setIsModalVisible(true);
        form.setFieldsValue(review);
    };

    const openAddModal = () => {
        setEditingReview(null);
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
                dataSource={filteredReviews}
                rowKey="review_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingReview ? t("Edit") : t("Add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                style={{ textAlign: "center" }}
            >
                <Form
                    form={form}
                    onFinish={
                        editingReview ? handleEditReview : handleAddReview
                    }
                    style={{ width: "100%" }}
                >
                    <Form.Item
                        label={t("Comment")}
                        name="comment"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the comment!"),
                            },
                        ]}
                    >
                        <Input.TextArea />
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
                        <Rate />
                    </Form.Item>
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
                        label={t("User Name")}
                        name="user_name"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the user name!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Review Date")}
                        name="review_date"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the review date!"),
                            },
                        ]}
                    >
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label={t("Status")} name="status">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingReview ? t("Update") : t("Add")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Reviews;
