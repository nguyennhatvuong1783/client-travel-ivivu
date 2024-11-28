import React, { useState } from "react";
import "./imageCarousel.scss";
import img from "../../assets/images/img.jpg";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

const ImageCarousel = () => {
    const images = [
        img,
        "https://cdn2.ivivu.com/2022/10/26/16/ivivu-san-may-da-lat-1-1-750x460.jpg",
        "https://cdn2.ivivu.com/2017/11/16/15/ivivu-tour-da-lat-3n2d-le-hoi-festival-hoa-da-lat-2017-thac-pongour-750x460.jpg",
        "https://cdn2.ivivu.com/2019/12/05/17/ivivu-vuon-hoa-da-lat-750x460.gif",
        "https://cdn2.ivivu.com/2024/01/22/13/ivivu-cong-troi-bali-da-lat-750x460.jpg",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="image_carousel">
            <img
                className="main_image_carousel"
                src={images[currentIndex]}
                alt={`product-${currentIndex}`}
            />

            <button className="btn_prev_image" onClick={prevImage}>
                <GrFormPreviousLink className="icon" />
            </button>

            <button className="btn_next_image" onClick={nextImage}>
                <GrFormNextLink className="icon" />
            </button>

            {/* Thumbnails */}
            <div className="thumbnails">
                {images.map((image, index) => (
                    <img
                        id="thumbnails__image"
                        key={index}
                        src={image}
                        alt={`thumbnail-${index}`}
                        style={{
                            opacity: index === currentIndex ? 0.6 : 1,
                            border:
                                index === currentIndex
                                    ? "2px solid #000"
                                    : "none",
                            transform:
                                index === currentIndex
                                    ? "scale(1.1)"
                                    : "scale(1)",
                        }}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
