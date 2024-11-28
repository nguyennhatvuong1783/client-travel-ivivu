import React, { useState } from "react";
import { Table, Button, Typography, Space, message } from "antd";

const { Text } = Typography;

const MyBooking = () => {
    const [bookings, setBookings] = useState([
        {
            id: 1,
            room: { name: "Deluxe Room", type: "Single" },
            created_at: "2024-11-01",
            status: "Pending",
            discount: "10% Off",
        },
        {
            id: 2,
            room: { name: "Superior Room", type: "Double" },
            created_at: "2024-11-02",
            status: "Confirmed",
            discount: null,
        },
        {
            id: 3,
            room: { name: "Suite Room", type: "Suite" },
            created_at: "2024-11-03",
            status: "Cancelled",
            discount: "5% Off",
        },
    ]);

    const handleCancel = (id) => {
        if (window.confirm("Do you really want to cancel this booking?")) {
            setBookings((prev) => prev.filter((booking) => booking.id !== id));
            message.success("Booking canceled successfully.");
        }
    };

    const columns = [
        {
            title: "Booking ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Room Name",
            dataIndex: ["room", "name"],
            key: "roomName",
        },
        {
            title: "Room Type",
            dataIndex: ["room", "type"],
            key: "roomType",
        },
        {
            title: "Created in",
            dataIndex: "created_at",
            key: "createdAt",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Text
                    type={
                        status === "Cancelled"
                            ? "danger"
                            : status === "Pending"
                            ? "warning"
                            : "success"
                    }
                >
                    {status}
                </Text>
            ),
        },
        {
            title: "Discounts",
            dataIndex: "discount",
            key: "discount",
            render: (discount) => discount || "None",
        },
        {
            title: "Activity",
            key: "activity",
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            message.info("Payment feature coming soon!")
                        }
                    >
                        Payment Online
                    </Button>
                    <Button danger onClick={() => handleCancel(record.id)}>
                        Cancel
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ marginTop: "10vh", padding: "20px" }}>
            <Typography.Title level={3}>YOUR BOOKING</Typography.Title>
            <Text type="secondary" style={{ fontStyle: "italic" }}>
                *Your booking will expire after 7 days if you don't check in
            </Text>
            <Table
                dataSource={bookings}
                columns={columns}
                rowKey="id"
                bordered
                style={{ marginTop: "20px" }}
            />
        </div>
    );
};

export default MyBooking;
