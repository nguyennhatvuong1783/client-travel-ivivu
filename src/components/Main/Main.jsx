import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./main.scss";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import Aos from "aos";
import "aos/dist/aos.css";
import { formatCurrency } from "../../utils/CurrencyUtils";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../utils/ScrollToTop";
import { getTourPackages } from "../../services/authService";

const Main = () => {
    const { t } = useTranslation();
    const [TourPackages, setTourPackages] = useState([]);

    // Scroll animation
    useEffect(() => {
        Aos.init({ duration: 1500 });
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
        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    {t("most visited destinations")}
                </h3>
            </div>

            <div className="secContent grid">
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

                                <div className="desc">
                                    <p>{tour.description}</p>
                                </div>

                                <Link
                                    to={`/detail/${tour.id}`}
                                    onClick={scrollToTop}
                                >
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
        </section>
    );
};

export default Main;
