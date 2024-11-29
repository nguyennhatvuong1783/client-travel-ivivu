import React, { useState, useEffect } from "react";
import { getMyBooking, vnpay } from "../../../services/authService";
import { Table, Button, Typography, Space, message } from "antd";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/authContext";
import dayjs from "dayjs";

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
                const response = await getMyBooking(user.id);

                setBookings(
                    response.data.data.map((booking) => ({
                        id: booking.id,
                        tourDate: {
                            tourPackageName: booking.tourDate.tourPackage.name,
                            departure_date: dayjs(
                                booking.tourDate.startDate
                            ).format("DD/MM/YYYY"),
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

    const handleVNPay = (booking) => {
        const vnPayRequest = {
            price: booking.total_price,
            orderInfo: "Payment VNPay",
            bookingId: booking.id,
        };
        const queryVnPayRequest = new URLSearchParams(vnPayRequest).toString();
        const paymentRequest = {
            bookingId: booking.id,
            amount: booking.total_price,
            method: "VNPAY",
            transaction: "string",
        };
        const queryPaymentRequest = new URLSearchParams(
            paymentRequest
        ).toString();
        vnPayApi(queryVnPayRequest, queryPaymentRequest);
    };

    const vnPayApi = async (queryVnPayRequest, queryPaymentRequest) => {
        try {
            const response = await vnpay(
                queryVnPayRequest,
                queryPaymentRequest
            );
            window.location = response.data.paymentUrl;
        } catch (err) {
            console.error(err);
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
            title: t("Payment Online"),
            key: "activity",
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleVNPay(record)}>
                        {t("VNPay")}
                    </Button>
                    <Button
                        type="primary"
                        onClick={() =>
                            message.info("Payment feature coming soon!")
                        }
                    >
                        {t("ZaloPay")}
                    </Button>
                </Space>
            ),
        },
        {
            title: t("Activity"),
            key: "activity",
            render: (_, record) => (
                <Space>
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
