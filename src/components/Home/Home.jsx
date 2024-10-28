import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './home.scss';
import video from '../../assets/videos/video.mp4';
import { GrLocation } from 'react-icons/gr';
import { HiFilter } from 'react-icons/hi';
import { FiFacebook } from 'react-icons/fi';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaTripadvisor } from 'react-icons/fa';
import { BsListTask } from 'react-icons/bs';
import { TbApps } from 'react-icons/tb';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { formatCurrency } from '../../utils/CurrencyUtils';

const Home = () => {
    const { t } = useTranslation();

    // Handle change input range
    const [rangeValue, setRangeValue] = useState(1000000);
    const handleChangeRangeValue = (event) => {
        setRangeValue(event.target.value);
    };

    // Scroll animation
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, []);

    return (
        <section className='home'>
            <div className="overlay"></div>
            <video src={video} muted autoPlay loop type="video/mp4"></video>

            <div className="homeContent container">
                <div className="textDiv">

                    <span data-aos="fade-up" className="smallText">
                        {t('our packages')}
                    </span>

                    <h1 data-aos="fade-up" className="homeTitle">
                        {t('search your holiday')}
                    </h1>

                </div>

                <div data-aos="fade-up" className="cardDiv grid">
                    <div className="destinationInput">
                        <label htmlFor="city">{t('search your destination:')}</label>
                        <div className="input flex">
                            <input type="text" placeholder={t('where do you want to go?')} />
                            <GrLocation className="icon" />
                        </div>
                    </div>

                    <div className="dateInput">
                        <label htmlFor="date">{t('select your date:')}</label>
                        <div className="input flex">
                            <input type="date" />
                        </div>
                    </div>

                    <div className="priceInput">
                        <div className="label_total flex">
                            <label htmlFor="price">{t('max price:')}</label>
                            <h3 className="total">{formatCurrency(rangeValue)}</h3>
                        </div>
                        <div className="input flex">
                            <input type="range" max="100000000" min="1000000" onChange={handleChangeRangeValue} />
                        </div>
                    </div>

                    <div className="searchOptions flex">
                        <HiFilter className="icon" />
                        <span>{t('filter')}</span>
                    </div>
                </div>

                <div data-aos="fade-up" className="homeFooterIcons flex">
                    <div className="rightIcons">
                        <FiFacebook className="icon" />
                        <AiOutlineInstagram className="icon" />
                        <FaTripadvisor className="icon" />
                    </div>

                    <div className="leftIcons">
                        <BsListTask className="icon" />
                        <TbApps className="icon" />
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Home;
