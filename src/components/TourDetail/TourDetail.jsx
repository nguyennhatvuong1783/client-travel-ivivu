import React from 'react';
import './tourdetail.scss';
import img from '../../assets/images/img.jpg';
import { GrLocation } from 'react-icons/gr';
import { GiCheckMark } from "react-icons/gi";

const TourDetail = () => {
    return (
        <section className='tourDetail grid'>
            <div className="tourTitle">
                <div className="bigTitle"><h1>Tour Đà Lạt 2N2Đ: Khám Phá Đà Lạt Ngàn Hoa</h1></div>
            </div>
            <div className="images">
                <div className="imgMain">
                    <img src={img} alt="imgMain" />
                </div>
            </div>
            <div className="baseInfo">
                <div className='destDiv'>
                    <div className='destItem'>
                        <GrLocation className='icon' /> Khởi hành từ: <h2>Hồ Chí Minh</h2>
                    </div>
                    <div className='destItem'>
                        Mã Tour: <h2>TO1086</h2>
                    </div>
                </div>
                <div className='feat'>
                    <div className='featTitle'>Tour Trọn Gói bao gồm</div>
                    <div className='featInfo'>
                        <ul className='featList'>
                            <li className="featItem">
                                <GiCheckMark className='icon'/> Khách sạn 3*</li>
                            <li className="featItem">
                                <GiCheckMark className='icon' /> Khách sạn 3*</li>
                            <li className="featItem">
                                <GiCheckMark className='icon' /> Khách sạn 3*</li>
                            <li className="featItem">
                                <GiCheckMark className='icon' /> Khách sạn 3*</li>
                            <li className="featItem">
                                <GiCheckMark className='icon' /> Khách sạn 3*</li>
                            <li className="featItem">
                                <GiCheckMark className='icon' /> Khách sạn 3*</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TourDetail;