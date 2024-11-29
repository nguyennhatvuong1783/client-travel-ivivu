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
    Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getTourPackages } from "../../../services/authService";

const TourPackages = () => {
    const { t } = useTranslation();
    const [tourPackages, setTourPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingPackage, setEditingPackage] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getTourPackages();
            if (response.data.statusCode === 200) {
                const normalizedPackages = response.data.data.map((pkg) => ({
                    ...pkg,
                    name: pkg.name || "",
                    description: pkg.description || "",
                    company_name: pkg.company_name || "",
                    depart_from: pkg.depart_from || "",
                    price: pkg.price || 0,
                    images: pkg.images || "",
                }));
                setTourPackages(normalizedPackages);
            } else {
                message.error("Failed to fetch tour packages");
            }
        } catch (error) {
            message.error("Error fetching tour packages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddPackage = async (values) => {
        // Xử lý thêm mới gói tour
    };

    const handleEditPackage = async (values) => {
        // Xử lý chỉnh sửa gói tour
    };

    const handleDeletePackage = async (packageId) => {
        // Xử lý xóa gói tour
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredPackages = tourPackages.filter(
        (pkg) =>
            pkg.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            pkg.description?.toLowerCase().includes(searchText.toLowerCase()) ||
            pkg.company_name
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            pkg.tour_code?.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleChange = (info) => {
        const newImages = info.fileList.map(
            (file) => file.originFileObj || file
        );

        form.setFieldsValue({
            images: newImages,
        });
        console.log(form.getFieldValue());
    };

    const beforeUpload = (file) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("Chỉ cho phép tải lên file .jpg hoặc .png!");
        }
        return isJpgOrPng;
    };

    const columns = [
        {
            title: t("Package ID"),
            dataIndex: "package_id",
        },
        {
            title: t("Name"),
            dataIndex: "name",
        },
        {
            title: t("Tour Code"),
            dataIndex: "tour_code",
        },
        {
            title: t("Company Name"),
            dataIndex: "company_name",
        },
        {
            title: t("Departure From"),
            dataIndex: "depart_from",
        },
        {
            title: t("Price"),
            dataIndex: "price",
        },
        {
            title: t("Duration"),
            dataIndex: "duration",
        },
        {
            title: t("Max Participants"),
            dataIndex: "max_participants",
        },
        {
            title: t("Images"),
            dataIndex: "images",
            render: (images) =>
                images ? (
                    <img src={images} alt="Tour" style={{ width: "50px" }} />
                ) : (
                    t("No Image")
                ),
        },
        {
            title: t("Action"),
            render: (_, record) => (
                <>
                    <Button onClick={() => openEditModal(record)} type="link">
                        {t("Edit")}
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this package?"
                        onConfirm={() => handleDeletePackage(record.package_id)}
                    >
                        <Button type="link" danger>
                            {t("Delete")}
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const openEditModal = (pkg) => {
        setEditingPackage(pkg);
        setIsModalVisible(true);
        form.setFieldsValue(pkg);
    };

    const openAddModal = () => {
        setEditingPackage(null);
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
                dataSource={filteredPackages}
                rowKey="package_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingPackage ? t("Edit") : t("Add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                style={{ textAlign: "center" }}
            >
                <Form
                    form={form}
                    onFinish={
                        editingPackage ? handleEditPackage : handleAddPackage
                    }
                    style={{ width: "100%" }}
                >
                    <Form.Item
                        label={t("Name")}
                        name="name"
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
                        label={t("Company Name")}
                        name="company_name"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the company name!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={t("Departure From")} name="depart_from">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Price")}
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the price!"),
                            },
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label={t("Description")} name="description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label={t("Duration")} name="duration">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Max Participants")}
                        name="max_participants"
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label={t("Price Detail")} name="price_detail">
                        <Upload
                            accept=".txt"
                            maxCount={1}
                            // onChange={handleChange}
                        >
                            <Button icon={<UploadOutlined />}>
                                Click to Upload
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label={t("Images")} name="images">
                        <Upload
                            multiple
                            accept=".jpg, .png"
                            onChange={handleChange}
                            beforeUpload={beforeUpload}
                        >
                            <Button icon={<UploadOutlined />}>
                                Click to Upload
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingPackage ? t("Update") : t("Add")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TourPackages;
