import React, { useState, useEffect } from 'react';
import './btnscrolltotop.scss'
import { FiChevronUp } from "react-icons/fi";
import { scrollToTop } from '../../utils/ScrollToTop';

const BtnScrollToTop = () => {
    const [isVisible, setIsVisible] = useState();

    // Hàm kiểm tra vị trí cuộn của trang
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Lắng nghe sự kiện scroll
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className='btnScroll'>
            {isVisible && (
                <button className='btn' onClick={scrollToTop}>
                    <FiChevronUp className='icon' />
                </button>
            )}
        </div>
    );
}

export default BtnScrollToTop;