import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './footer.scss';
import logo from '../../assets/images/logo.png';
import video2 from '../../assets/videos/video_footer.mp4';
import { FiSend } from "react-icons/fi";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/ScrollToTop';

const Footer = () => {
    const { t } = useTranslation();

    // Scroll animation
    useEffect(() => {
        Aos.init({ duration: 1500 })
    }, []);

    return (
        <section className='footer'>
            <div className="videoDiv">
                <video src={video2} loop autoPlay muted type="video/mp4"></video>
            </div>

            <div className="secContent container">
                <div className="contactDiv flex">
                    <div data-aos="fade-up" className="text">
                        <small>{t('keep in touch')}</small>
                        <h2>{t('travel with us')}</h2>
                    </div>

                    <div className="inputDiv flex">
                        <input data-aos="fade-up" type="text" placeholder={t('enter email address')} />
                        <button data-aos="fade-up" className="btn flex" type='submit'>
                            {t('send')} <FiSend className='icon' />
                        </button>
                    </div>
                </div>

                <div className="footerCard flex">
                    <div className="footerIntro flex">
                        <div className="logoDiv">
                            <Link to={'/'} className="logo flex" onClick={scrollToTop}>
                                <img src={logo} alt="Logo" /> Travel.
                            </Link>
                        </div>

                        <div data-aos="fade-up" className="footerParagraph">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam inventore eos fuga hic cum voluptatem minima, tempore non odiont provide nobis ipsam at, doloremque sed cupiditate ipsum in, atque soluta?
                        </div>

                        <div data-aos="fade-up" className="footerSocials">
                            <AiOutlineTwitter className='icon' />
                            <AiFillYoutube className='icon' />
                            <AiFillInstagram className='icon' />
                            <FaTripadvisor className='icon' />
                        </div>
                    </div>

                    <div className="footerLinks grid">
                        {/* Group One */}
                        <div data-aos="fade-up" className="linkGroup">
                            <span className="groupTitle">
                                {t('our agency')}
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('services')}
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('insurance')}
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('agency')}
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('tourism')}
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('payment')}
                            </li>
                        </div>

                        {/* Group Two */}
                        <div data-aos="fade-up" className="linkGroup">
                            <span className="groupTitle">
                                {t('our agency')}
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('services')}
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('insurance')}
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('agency')}
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('tourism')}
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('payment')}
                            </li>
                        </div>

                        {/* Group Three */}
                        <div data-aos="fade-up" className="linkGroup">
                            <span className="groupTitle">
                                {t('our agency')}
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('services')}
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('insurance')}
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('agency')}
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('tourism')}
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" /> {t('payment')}
                            </li>
                        </div>
                    </div>

                    <div className="footerDiv flex">
                        <small>{t('BEST TRAVEL WEBSITE THEME')}</small>
                        <small>{t('COPYRIGHTS RESERVED - ISRATECH 2022')}</small>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;
