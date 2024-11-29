import React, { useState, useEffect } from "react";
import {
    getMyBooking,
    updateStatusBooking,
    vnpay,
    vnpayConfirm,
    zalopay,
} from "../../../services/authService";
import { Table, Button, Typography, Space, message } from "antd";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/authContext";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const { Text } = Typography;

const MyBooking = () => {
    const { t } = useTranslation();
    const MySwal = withReactContent(Swal);
    const { user } = useAuth();
    const location = useLocation();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, [user.id]);

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

    const handleCancel = async (id) => {
        if (window.confirm("Do you really want to cancel this booking?")) {
            apiCancell(id);
        }
    };

    const apiCancell = async (id) => {
        try {
            await updateStatusBooking("cancelled", id);
            fetchBookings();
            message.success("Booking canceled successfully.");
        } catch (err) {
            console.error("Failed to cancel booking:", err);
            message.error("Failed to cancel booking. Please try again.");
        }
    };

    const handleVNPay = (booking) => {
        const paymentRequest = {
            bookingId: booking.id,
            amount: booking.total_price,
            method: "VNPAY",
            transaction: "string",
        };
        vnPayApi(paymentRequest);
    };

    const vnPayApi = async (paymentRequest) => {
        try {
            const response = await vnpay(paymentRequest);
            sessionStorage.setItem("bookingId", response.data.bookingId);
            window.location = response.data.paymentUrl;
        } catch (err) {
            console.error(err);
        }
    };

    const handleZaloPay = (booking) => {
        const value = {
            bookingId: booking.id,
            amount: booking.total_price,
            method: "ZALOPAY",
            transaction: "string",
        };

        zaloPayApi(value);
    };

    const zaloPayApi = async (value) => {
        try {
            const response = await zalopay(value);
            window.location = response.data.data;
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const responseCode = queryParams.get("vnp_ResponseCode");
        const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");
        if (responseCode) {
            const Toast = MySwal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = MySwal.stopTimer;
                    toast.onmouseleave = MySwal.resumeTimer;
                    toast.onclick = MySwal.close;
                },
            });
            if (responseCode === "00") {
                const handlePaySuccess = async () => {
                    try {
                        const bookingId = sessionStorage.getItem("bookingId");
                        const response = await vnpayConfirm(
                            bookingId,
                            vnp_TransactionNo
                        );
                        console.log("Success", response);
                        Toast.fire({
                            icon: "success",
                            title: t("Payment successfully"),
                        });
                    } catch (err) {
                        console.log("Error", err);
                        Toast.fire({
                            icon: "error",
                            title: t("Payment error"),
                        });
                    }
                };
                handlePaySuccess();
            } else {
                Toast.fire({
                    icon: "error",
                    title: t("Payment error"),
                });
            }
        }
    }, [location.search]);

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
                        onClick={() => handleZaloPay(record)}
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
