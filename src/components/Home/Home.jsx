import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './home.scss';
import video from '../../assets/videos/video.mp4';
import { FiFacebook } from 'react-icons/fi';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaTripadvisor } from 'react-icons/fa';
import { BsListTask } from 'react-icons/bs';
import { TbApps } from 'react-icons/tb';
import Aos from 'aos';
import 'aos/dist/aos.css';
import CardFilter from './CardFilter/CardFilter';

const Home = () => {
    const { t } = useTranslation();

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

                <CardFilter />

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
