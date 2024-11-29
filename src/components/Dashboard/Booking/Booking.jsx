import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { getBooking } from "../../../services/authService";

const Booking = () => {
    const { t } = useTranslation();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingBooking, setEditingBooking] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getBooking();
            if (response.data.statusCode === 200) {
                const normalizedBookings = response.data.data
                    .filter((booking) => booking.status)
                    .map((booking) => ({
                        ...booking,
                        tour_name: booking.tour_name || "",
                        user_name: booking.user_name || "",
                        departure_date: booking.departure_date || "",
                        total_price: booking.total_price || 0,
                    }));
                setBookings(normalizedBookings);
            } else {
                message.error("Failed to fetch bookings");
            }
        } catch (error) {
            message.error("Error fetching bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddBooking = async (values) => {
        // Xử lý thêm mới booking
    };

    const handleEditBooking = async (values) => {
        // Xử lý chỉnh sửa booking
    };

    const handleDeleteBooking = async (bookingId) => {
        // try {
        //     await deleteBooking(bookingId);
        //     message.success("Booking deleted successfully");
        //     fetchData();
        // } catch (error) {
        //     message.error("Error deleting booking");
        // }
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredBookings = bookings.filter(
        (booking) =>
            booking.tour_name
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            "" ||
            booking.user_name
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            "" ||
            booking.booking_code
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            "" ||
            booking.total_price?.toString().includes(searchText) ||
            ""
    );

    const columns = [
        {
            title: t("bookingId"),
            dataIndex: "booking_code",
        },
        {
            title: t("tourPackageName"),
            dataIndex: "tour_name",
        },
        {
            title: t("number_of_participants"),
            dataIndex: "num_people",
        },
        {
            title: t("Departure date"),
            dataIndex: "departure_date",
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: t("Status"),
            dataIndex: "status",
        },
        {
            title: t("Promotion"),
            dataIndex: "promotion",
        },
        {
            title: t("total_price"),
            dataIndex: "total_price",
        },
        {
            title: t("User Name"),
            dataIndex: "user_name",
        },
        {
            title: t("Action"),
            render: (_, record) => (
                <>
                    <Button onClick={() => openEditModal(record)} type="link">
                        {t("Edit")}
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this booking?"
                        onConfirm={() => handleDeleteBooking(record.id)}
                    >
                        <Button type="link" danger>
                            {t("Delete")}
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const openEditModal = (booking) => {
        setEditingBooking(booking);
        setIsModalVisible(true);
        form.setFieldsValue(booking);
    };

    const openAddModal = () => {
        setEditingBooking(null);
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
                dataSource={filteredBookings}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingBooking ? t("Edit") : t("Add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                style={{ textAlign: "center" }}
            >
                <Form
                    form={form}
                    onFinish={
                        editingBooking ? handleEditBooking : handleAddBooking
                    }
                    style={{ width: "100%" }}
                >
                    <Form.Item
                        label={t("Booking Code")}
                        name="booking_code"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the booking code!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Tour Name")}
                        name="tour_name"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the tour name!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Number of People")}
                        name="num_people"
                        rules={[
                            {
                                required: true,
                                message: t(
                                    "Please input the number of people!"
                                ),
                            },
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label={t("Departure Date")}
                        name="departure_date"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the departure date!"),
                            },
                        ]}
                    >
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label={t("Status")} name="status">
                        <Input />
                    </Form.Item>
                    <Form.Item label={t("Promotion")} name="promotion">
                        <Input />
                    </Form.Item>
                    <Form.Item label={t("Total Price")} name="total_price">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label={t("User Name")} name="user_name">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingBooking ? t("Update") : t("Add")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Booking;
