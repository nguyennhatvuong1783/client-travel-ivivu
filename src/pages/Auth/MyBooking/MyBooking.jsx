import React, { useState, useEffect } from "react";
import { getBooking } from "../../../services/authService";
import { Table, Button, Typography, Space, message } from "antd";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/authContext";

const { Text } = Typography;

const MyBooking = () => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await getBooking();
                const filteredBookings = response.data.data.filter(
                    (booking) => booking.user.id === user.id
                );

                setBookings(
                    filteredBookings.map((booking) => ({
                        id: booking.id,
                        tourDate: {
                            tourPackageName: booking.tourDate.tourPackage.name,
                            departure_date: booking.tourDate.startDate,
                        },
                        participants: booking.participants,
                        status: booking.status,
                        discount: booking.promotions.length
                            ? `${booking.promotions[0].discount}% Off`
                            : null,
                        total_price: booking.totalPrice,
                    }))
                );
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
                message.error("Failed to load bookings. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user.id]);

    const handleCancel = async (id) => {
        if (window.confirm("Do you really want to cancel this booking?")) {
            try {
                // await axiosInstance.delete(`/api/bookings/${id}`);
                setBookings((prev) =>
                    prev.filter((booking) => booking.id !== id)
                );
                message.success("Booking canceled successfully.");
            } catch (error) {
                console.error("Failed to cancel booking:", error);
                message.error("Failed to cancel booking. Please try again.");
            }
        }
    };

    const columns = [
        {
            title: t("bookingId"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("tourPackageName"),
            dataIndex: ["tourDate", "tourPackageName"],
            key: "tourPackageName",
        },
        {
            title: t("number_of_participants"),
            dataIndex: "participants",
            key: "participants",
        },
        {
            title: t("Departure date"),
            dataIndex: ["tourDate", "departure_date"],
            key: "departure_date",
        },
        {
            title: t("Status"),
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Text
                    type={
                        status === "CANCELLED"
                            ? "danger"
                            : status === "PENDING"
                            ? "warning"
                            : "success"
                    }
                >
                    {status}
                </Text>
            ),
        },
        {
            title: t("Discounts"),
            dataIndex: "discount",
            key: "discount",
            render: (discount) => discount || "None",
        },
        {
            title: t("total_price"),
            dataIndex: "total_price",
            key: "total_price",
        },
        {
            title: t("Activity"),
            key: "activity",
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            message.info("Payment feature coming soon!")
                        }
                    >
                        {t("Payment Online")}
                    </Button>
                    <Button danger onClick={() => handleCancel(record.id)}>
                        {t("Cancel")}
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ marginTop: "10vh", padding: "20px" }}>
            <Typography.Title level={3}>{t("YOUR BOOKING")}</Typography.Title>
            <Text type="secondary" style={{ fontStyle: "italic" }}>
                *
            </Text>
            <Table
                dataSource={bookings}
                columns={columns}
                rowKey="id"
                bordered
                loading={loading} // Hiển thị trạng thái loading
                style={{ marginTop: "20px" }}
            />
        </div>
    );
};

export default MyBooking;
