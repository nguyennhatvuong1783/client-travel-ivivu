import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { deleteUser, getUsers } from "../../../services/authService";

const Users = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getUsers();
            if (response.data.statusCode === 200) {
                const normalizedUsers = response.data.data
                    .filter((user) => user.status)
                    .map((user) => ({
                        ...user,
                        full_name: user.full_name || "",
                        email: user.email || "",
                        date_of_birth: user.date_of_birth || "",
                    }));
                setUsers(normalizedUsers);
            } else {
                message.error("Failed to fetch users");
            }
        } catch (error) {
            message.error("Error fetching users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddUser = async (values) => {
        // try {
        //     await axios.post("https://jsonplaceholder.typicode.com/users", values);
        //     message.success("User added successfully");
        //     setIsModalVisible(false);
        //     fetchUsers();
        // } catch (error) {
        //     message.error("Error adding user");
        // }
    };

    const handleEditUser = async (values) => {
        // try {
        //     await axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, values);
        //     message.success("User updated successfully");
        //     setIsModalVisible(false);
        //     fetchUsers();
        // } catch (error) {
        //     message.error("Error updating user");
        // }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            message.success("User deleted successfully");
            fetchData();
        } catch (error) {
            message.error("Error deleting user");
        }
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.full_name?.toLowerCase().includes(searchText.toLowerCase()) ||
            "" ||
            user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
            "" ||
            user.username?.toLowerCase().includes(searchText.toLowerCase()) ||
            "" ||
            user.phone_number
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            ""
    );

    const columns = [
        {
            title: t("name"),
            dataIndex: "full_name",
        },
        {
            title: t("username"),
            dataIndex: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: t("phone"),
            dataIndex: "phone_number",
        },
        {
            title: t("address"),
            dataIndex: "address",
        },
        {
            title: t("date of birth"),
            dataIndex: "date_of_birth",
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: t("Action"),
            render: (_, record) => (
                <>
                    <Button onClick={() => openEditModal(record)} type="link">
                        {t("Edit")}
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this user?"
                        onConfirm={() => handleDeleteUser(record.id)}
                    >
                        <Button type="link" danger>
                            {t("Delete")}
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const openEditModal = (user) => {
        setEditingUser(user);
        setIsModalVisible(true);
        form.setFieldsValue(user);
    };

    const openAddModal = () => {
        setEditingUser(null);
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
                dataSource={filteredUsers}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingUser ? t("Edit") : t("Add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                style={{ textAlign: "center" }}
            >
                <Form
                    form={form}
                    onFinish={editingUser ? handleEditUser : handleAddUser}
                    style={{ width: "100%" }}
                >
                    <Form.Item
                        label={t("Username")}
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the user's username!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Full Name")}
                        name="full_name"
                        rules={[
                            {
                                required: true,
                                message: t(
                                    "Please input the user's full name!"
                                ),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Email")}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: t("Please input the user's email!"),
                            },
                            {
                                type: "email",
                                message: t("Please enter a valid email!"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("Phone Number")}
                        name="phone_number"
                        rules={[
                            {
                                required: true,
                                message: t(
                                    "Please input the user's phone number!"
                                ),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={t("Address")} name="address">
                        <Input />
                    </Form.Item>
                    <Form.Item label={t("Date of Birth")} name="date_of_birth">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingUser ? t("Update") : t("Add")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Users;
