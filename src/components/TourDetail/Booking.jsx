import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Booking = () => {
    const MySwal = withReactContent(Swal);

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user } = useAuth();
    const [hover, setHover] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dates, setDates] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const pricePerPerson = 3770000;

    useEffect(() => {
        const fetchDates = async () => {
            // Dữ liệu giả lập
            const mockDates = [
                { date: "2024-12-05", price: 30000, isBestPrice: true },
                { date: "2024-12-12", price: 3770000, isBestPrice: true },
                { date: "2024-12-19", price: 3770000, isBestPrice: false },
                { date: "2024-12-26", price: 3770000, isBestPrice: false },
                { date: "2024-12-06", price: 3770000, isBestPrice: true },
                { date: "2024-12-11", price: 3770000, isBestPrice: true },
                { date: "2024-12-18", price: 3770000, isBestPrice: false },
                { date: "2024-12-25", price: 3770000, isBestPrice: false },
            ];
            setDates(mockDates);
        };
        fetchDates();
    }, []);

    const handleQuantityChange = (operation) => {
        setQuantity((prev) =>
            Math.max(1, operation === "increase" ? prev + 1 : prev - 1)
        );
    };

    const handleBooking = () => {
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
        Toast.fire({
            icon: "success",
            title: t("Booking successfully"),
        });
    };

    const totalPrice = quantity * pricePerPerson;

    return (
        <div
            className="tour-pricing-container"
            style={{
                float: "right",
                padding: "20px",
                background: "#fff3e0",
                borderRadius: "10px",
                width: "20%",
                margin: "24.8vh 10% 0 0",
            }}
        >
            <h3 style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                {t("Tour Schedule and Price")}
            </h3>
            <p style={{ fontSize: "1.2rem", color: "#555", margin: "12px 0" }}>
                {t("Select Schedule and View Prices")}
            </p>

            <div
                className="date-selector"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "15px",
                }}
            >
                {dates.map((date) => (
                    <button
                        key={date.date}
                        onClick={() => setSelectedDate(date.date)}
                        style={{
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            background:
                                selectedDate === date.date ? "#4caf50" : "#fff",
                            color: selectedDate === date.date ? "#fff" : "#000",
                        }}
                    >
                        {new Date(date.date).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                        })}
                    </button>
                ))}
            </div>

            <div className="price-details">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "10px",
                        fontSize: "1.2rem",
                    }}
                >
                    <p>{t("Number of people")}</p>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <button
                            onClick={() => handleQuantityChange("decrease")}
                            style={{
                                padding: "5px",
                                borderRadius: "5px",
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                            }}
                        >
                            <FaMinus />
                        </button>
                        <span>{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange("increase")}
                            style={{
                                padding: "5px",
                                borderRadius: "5px",
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                            }}
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>
                <div
                    style={{
                        marginTop: "10px",
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                        color: "#ff5722",
                    }}
                >
                    {t("Total Tour Price")}
                    {totalPrice.toLocaleString("vi-VN")} VND
                </div>
            </div>

            <button
                style={{
                    marginTop: "15px",
                    padding: "10px 20px",
                    background: hover ? "#e64a19" : "#ff5722",
                    color: "#fff",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    transition: "background-color 0.3s ease",
                }}
                onClick={() => (user ? handleBooking() : navigate("/login"))}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {user ? t("Booking") : t("book now")}
            </button>
        </div>
    );
};

export default Booking;
