import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./tourlist.scss";
import { formatCurrency } from "../../utils/CurrencyUtils";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../utils/ScrollToTop";
import { getTourPackages } from "../../services/authService.js";

const TourList = () => {
    const { t } = useTranslation();
    const [TourPackages, setTourPackages] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getTourPackages();
            setTourPackages(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="tourList grid">
            {TourPackages.map((tour) => {
                return (
                    <div
                        key={tour.id}
                        data-aos="fade-up"
                        className="singleDestination"
                    >
                        <div className="imageDiv">
                            <img src={tour.image} alt={tour.name} />
                        </div>

                        <div className="cardInfo">
                            <h4 className="destTitle">{tour.name}</h4>
                            <span className="continent flex">
                                <HiOutlineLocationMarker className="icon" />
                                <span className="name">
                                    {tour.destinations[0]}
                                </span>
                            </span>

                            <div className="fees flex">
                                <div className="grade">
                                    <span>
                                        {"Participants Max "}
                                        <small>{tour.count}</small>
                                    </span>
                                </div>
                                <div className="price">
                                    <h5>{formatCurrency(tour.price)}</h5>
                                </div>
                            </div>

                            <Link to={"/detail"} onClick={scrollToTop}>
                                <button className="btn flex">
                                    {t("details")}{" "}
                                    <HiOutlineClipboardCheck className="icon" />
                                </button>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TourList;
