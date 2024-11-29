import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { getCompanies } from "../../../services/authService";

const Companies = () => {
    const { t } = useTranslation();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getCompanies();
            if (response.data.status === 200) {
                const normalizedCompanies = response.data.data
                    .filter((company) => company.status)
                    .map((company) => ({
                        ...company,
                        company_name: company.company_name || "",
                        description: company.description || "",
                        status: company.status || "",
                    }));
                setCompanies(normalizedCompanies);
            } else {
                message.error("Failed to fetch companies");
            }
        } catch (error) {
            message.error("Error fetching companies");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddCompany = async (values) => {
        // Xử lý thêm mới công ty
    };

    const handleEditCompany = async (values) => {
        // Xử lý chỉnh sửa công ty
    };

    const handleDeleteCompany = async (companyId) => {
        // Xử lý xóa công ty
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredCompanies = companies.filter(
        (company) =>
            company.company_name
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            company.description
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            company.status?.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: t("Company ID"),
            dataIndex: "company_id",
        },
        {
            title: t("Company Name"),
            dataIndex: "company_name",
        },
        {
            title: t("Description"),
            dataIndex: "description",
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
                        title="Are you sure you want to delete this company?"
                        onConfirm={() => handleDeleteCompany(record.company_id)}
                    >
                        <Button type="link" danger>
                            {t("Delete")}
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const openEditModal = (company) => {
        setEditingCompany(company);
        setIsModalVisible(true);
        form.setFieldsValue(company);
    };

    const openAddModal = () => {
        setEditingCompany(null);
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
                dataSource={filteredCompanies}
                rowKey="company_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingCompany ? t("Edit") : t("Add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                style={{ textAlign: "center" }}
            >
                <Form
                    form={form}
                    onFinish={
                        editingCompany ? handleEditCompany : handleAddCompany
                    }
                    style={{ width: "100%" }}
                >
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
                    <Form.Item label={t("Status")} name="status">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingCompany ? t("Update") : t("Add")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Companies;
