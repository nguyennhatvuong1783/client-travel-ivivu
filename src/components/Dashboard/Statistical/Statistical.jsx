import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Row, Col, Statistic, Table, DatePicker } from "antd";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { getBooking } from "../../../services/authService";

const { RangePicker } = DatePicker;
dayjs.extend(isBetween);

const Statistical = () => {
    const { t } = useTranslation();
    const [filteredData, setFilteredData] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [cancellationData, setCancellationData] = useState([]);
    const [statisticsData, setStatisticsData] = useState({
        totalRevenue: 0,
        cancellationRate: 0,
    });

    useEffect(() => {
        const months = generateLastSixMonths();
        fetchBookingData(months);
        const start = dayjs().subtract(5, "month").startOf("month");
        const end = dayjs().endOf("month");
        handleDateChange([start, end]);
    }, []);

    const generateLastSixMonths = () => {
        const months = [];
        for (let i = 5; i >= 0; i--) {
            months.push(dayjs().subtract(i, "month").format("MM/YYYY"));
        }
        return months;
    };

    const fetchBookingData = async (months) => {
        try {
            const response = await getBooking();
            const data = response.data.data;

            // Tính doanh thu
            const revenue = months.map((month) => {
                const filteredBookings = data.filter((booking) => {
                    const bookingMonth = dayjs(booking.date).format("MM/YYYY");
                    return (
                        bookingMonth === month && booking.status === "complete"
                    );
                });

                const totalRevenue = filteredBookings.reduce(
                    (total, booking) => total + booking.price,
                    0
                );

                return { month, revenue: totalRevenue };
            });

            // Tính tỷ lệ hủy
            const cancellations = months.map((month) => {
                const totalBookings = data.filter(
                    (booking) => dayjs(booking.date).format("MM/YYYY") === month
                );

                const cancelledBookings = totalBookings.filter(
                    (booking) => booking.status === "cancelled"
                );

                const cancellationRate = totalBookings.length
                    ? (cancelledBookings.length / totalBookings.length) * 100
                    : 0;

                return {
                    month,
                    cancellationRate: cancellationRate.toFixed(2),
                };
            });

            setRevenueData(revenue);
            setCancellationData(cancellations);

            // Tính tổng doanh thu và tỷ lệ hủy tổng
            const totalRevenue = revenue.reduce(
                (total, item) => total + item.revenue,
                0
            );
            const cancellationRate =
                cancellations.reduce(
                    (total, item) => total + parseFloat(item.cancellationRate),
                    0
                ) / cancellations.length;

            setStatisticsData({
                totalRevenue,
                cancellationRate: cancellationRate.toFixed(2),
            });
        } catch (error) {
            console.error("Error fetching booking data:", error);
        }
    };

    const handleDateChange = (dates) => {
        if (!dates) return;
        const [start, end] = dates;

        const monthsInRange = [];
        let current = dayjs(start).startOf("month");

        while (current.isBefore(dayjs(end).endOf("month"))) {
            monthsInRange.push(current.format("MM/YYYY"));
            current = current.add(1, "month");
        }

        const filledRevenueData = monthsInRange.map((month) => {
            const existingData = revenueData.find(
                (item) => item.month === month
            );
            return existingData || { month: `${month}`, revenue: 0 };
        });

        const filledCancellationData = monthsInRange.map((month) => {
            const existingData = cancellationData.find(
                (item) => item.month === month
            );
            return existingData || { month: `${month}`, cancellationRate: 0 };
        });

        setFilteredData(filledRevenueData);
        setCancellationData(filledCancellationData);
    };

    // const statisticsData = {
    //     totalTours: 150,
    //     popularTour: "Tour Đà Lạt",
    //     customerReviews: [
    //         { tour: "Tour Đà Lạt", rating: 4.5 },
    //         { tour: "Tour Phú Quốc", rating: 4.2 },
    //         { tour: "Tour Nha Trang", rating: 4.8 },
    //     ],
    // };

    const columns = [
        {
            title: "Tour",
            dataIndex: "tour",
            key: "tour",
        },
        {
            title: "Đánh giá",
            dataIndex: "rating",
            key: "rating",
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <Row gutter={16}>
                {/* Thống kê tổng số tour */}
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Tổng số tour"
                            value={statisticsData.totalTours}
                            prefix={<AiOutlineFundProjectionScreen />}
                            valueStyle={{ color: "#3f8600" }}
                        />
                    </Card>
                </Col>

                {/* Thống kê doanh thu */}
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Doanh thu"
                            value={statisticsData.totalRevenue}
                            prefix={<FaMoneyBillWave />}
                            valueStyle={{ color: "#cf1322" }}
                            formatter={(value) =>
                                `${value.toLocaleString()} VND`
                            }
                        />
                    </Card>
                </Col>

                {/* Thống kê tỷ lệ hủy */}
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Tỷ lệ hủy"
                            value={statisticsData.cancellationRate}
                            prefix={<MdCancel />}
                            valueStyle={{ color: "#1890ff" }}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>

            {/* Biểu đồ doanh thu theo tháng */}
            <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                <Col span={24}>
                    <Card
                        title="Doanh thu theo tháng"
                        style={{ textAlign: "center" }}
                    >
                        <div style={{ marginBottom: 20 }}>
                            <RangePicker
                                onChange={handleDateChange}
                                picker="month"
                                style={{ width: "60%" }}
                                defaultValue={[
                                    dayjs()
                                        .subtract(5, "month")
                                        .startOf("month"),
                                    dayjs().endOf("month"),
                                ]}
                            />
                        </div>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={filteredData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) =>
                                        `${value.toLocaleString()} VND`
                                    }
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

            {/* Biểu đồ tỷ lệ hủy theo tháng */}
            <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={24}>
                    <Card title="Tỷ lệ hủy theo tháng">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={cancellationData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="cancellationRate"
                                    stroke="#ff7300"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

            {/* Tour phổ biến */}
            <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={24}>
                    <Card title="Tour phổ biến">
                        <h3>{statisticsData.popularTour}</h3>
                    </Card>
                </Col>
            </Row>

            {/* Bảng đánh giá tour */}
            <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={24}>
                    <Card title="Đánh giá của khách hàng">
                        <Table
                            dataSource={statisticsData.customerReviews}
                            columns={columns}
                            rowKey="tour"
                            pagination={false}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Statistical;
