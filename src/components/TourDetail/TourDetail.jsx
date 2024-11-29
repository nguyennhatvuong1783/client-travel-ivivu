import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./tourdetail.scss";
import { GrLocation } from "react-icons/gr";
import { GiCheckMark } from "react-icons/gi";
import ImageCarousel from "./ImageCarousel";
import Booking from "./Booking";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getTourPackagesById } from "../../services/authService";

const tabData = {
    "Giá bao gồm": [
        "- Xe đưa đón tại sân bay, nhà ga, bến xe tham quan theo chương trình",
        "- Khách sạn 2 sao Đà Lạt: Tầm Xuân, Thắng Lợi 2, LiLy, Lê Na... hoặc tương đương",
        "- Bữa ăn: 01 bữa điểm tâm sáng theo tiêu chuẩn khách sạn, từ 3 sao trở lên ăn sáng buffet. Ăn chính 03 bữa thực đơn 150.000/suất.",
        "- Vé tham quan: tại các điểm theo chương trình.",
        "- HDV Tiếng Việt phụ vụ nhiệt tình chu đáo",
        "- Khuyến mãi: Nước uống Sanna.",
        "- Bảo hiểm: 30.000.000 VND/vụ, theo quy định của BH Bảo Việt.",
    ],
    "Giá không bao gồm": [
        "- Thuế VAT 10%",
        "- Chi phí cá nhân, điện thoại, giặt ủi, các dịch vụ ngoài chương trình",
        "- Các chi phí phát sinh khác.",
    ],
    "Phụ thu": [
        "- Phụ thu phòng đơn: 300.000 VND/phòng/đêm",
        "- Phụ thu xe đi thêm các điểm ngoài chương trình.",
    ],
    "Hủy đổi": [
        "- Hủy trước 7 ngày: Phí hủy 30% giá trị tour.",
        "- Hủy trước 3 ngày: Phí hủy 50% giá trị tour.",
        "- Hủy trong vòng 1 ngày: Phí hủy 100% giá trị tour.",
    ],
    "Lưu ý": [
        "- Vui lòng mang theo CMND/CCCD khi tham gia tour.",
        "- Đảm bảo sức khỏe tốt khi tham gia các hoạt động thể thao mạo hiểm.",
        "- Các lưu ý khác sẽ được hướng dẫn thêm trước khi tham gia tour.",
    ],
    "Hướng dẫn viên": [
        "- Hướng dẫn viên sẽ đưa ra thông tin chi tiết về chương trình tour.",
        "- Hướng dẫn viên sẽ giúp bạn giải đáp các câu hỏi về địa điểm tham quan.",
    ],
};

const TourDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [tour, setTour] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getTourPackagesById(id);
            setTour(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Dữ liệu mẫu
    // const [details, setDetails] = useState({
    //     day: "Ngày 1",
    //     title: "Sb Liên Khương/ Bến Xe - Đà Lạt Ngàn Hoa",
    //     meals: "(Ăn Trưa, Tối)",
    //     description: `Khởi hành từ sân bay Liên Khương hoặc bến xe. Tham quan Đà Lạt với những điểm đến nổi bật và trải nghiệm ẩm thực địa phương.Khám phá vẻ đẹp mộng mơ và quyến rũ của Đà Lạt trong
    //                         2 ngày 1 đêm. Tour này dành cho những ai muốn trải
    //                         nghiệm sự kết hợp hài hòa giữa thiên nhiên, kiến
    //                         trúc và văn hóa đặc sắc của thành phố này. Đà Lạt
    //                         không chỉ nổi tiếng với danh hiệu 'Thành Phố Ngàn
    //                         Hoa' mà còn là điểm đến lý tưởng cho những ai yêu
    //                         thích sự yên bình và không gian lãng mạn. Cùng iVIVU
    //                         khám phá ngay hôm nay!`,
    // });
    // const [feature, setFeature] = useState([
    //     "Khách sạn 3*",
    //     "Khách sạn 3*",
    //     "Khách sạn 3*",
    //     "Khách sạn 3*",
    // ]);

    const [selectedTab, setSelectedTab] = useState(Object.keys(tabData)[0]);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <section className="tourDetail grid">
                <div className="tourTitle">
                    <div className="bigTitle">
                        <h1>{tour.name}</h1>
                    </div>
                </div>
                <div className="images">
                    <div className="imgMain">
                        <ImageCarousel imgs={tour.image} />
                    </div>
                </div>
                <div className="baseInfo">
                    <div className="destDiv">
                        <div className="destItem">
                            <GrLocation className="icon" />{" "}
                            {t("Departure from")}
                            <h2>{tour.destinations}</h2>
                        </div>
                        <div className="destItem">
                            {t("Tour ID")}
                            <h2>{tour.tourCode}</h2>
                        </div>
                    </div>
                    <div className="feat">
                        <div className="featTitle">
                            {t("Package Tour includes")}
                        </div>
                        <div className="featInfo">
                            <ul className="featList">
                                {tour.tourFeature?.map((feat) => (
                                    <li className="featItem">
                                        <GiCheckMark
                                            className="icon"
                                            key={feat.id}
                                        />{" "}
                                        {feat.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="baseInfo">
                    <div className="feat">
                        <h2 className="featTitle">
                            {t("Fun experience on tour")}
                        </h2>
                        <p className="tour_desc">{tour.description}</p>
                    </div>
                </div>
                <div className="baseInfo">
                    <div className="feat">
                        <h2 className="featTitle">{t("Tour program")}</h2>
                        {tour.destinations?.map((dest, index) => {
                            return (
                                <div
                                    className="tour_activities"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    <h3>{index}</h3>
                                    <p className="activity_name">{dest.name}</p>
                                    <p>{dest.name}</p>
                                    <div
                                        className={`act_expand${
                                            isExpanded ? " is_open" : ""
                                        }`}
                                    >
                                        {dest.description}
                                    </div>
                                    {isExpanded ? (
                                        <FaAngleUp className="icon" />
                                    ) : (
                                        <FaAngleDown className="icon" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="baseInfo">
                    <div className="feat">
                        <h2 className="featTitle">
                            {t("Important information")}
                        </h2>
                        <div className="tabs">
                            {Object.keys(tabData).map((tab) => (
                                <button
                                    key={tab}
                                    className={`tab ${
                                        selectedTab === tab ? "active" : ""
                                    }`}
                                    onClick={() => setSelectedTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="tab-content">
                            <ul>
                                {tabData[selectedTab].map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Booking />
        </>
    );
};

export default TourDetail;
