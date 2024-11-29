import React from "react";
import { Card, Row, Col, Statistic, Table } from "antd";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Statistical = () => {
    const statisticsData = {
        totalTours: 150,
        totalRevenue: 250000,
        popularTour: "Tour Đà Lạt",
        cancellationRate: 5,
        customerReviews: [
            { tour: "Tour Đà Lạt", rating: 4.5 },
            { tour: "Tour Phú Quốc", rating: 4.2 },
            { tour: "Tour Nha Trang", rating: 4.8 },
        ],
    };

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
