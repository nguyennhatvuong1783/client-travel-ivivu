import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './navbar.scss';
import logo from '../../assets/images/logo.png';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../utils/ScrollToTop';
import BtnScrollToTop from '../BtnScrollToTop/BtnScrollToTop';
import { useAuth } from '../../context/authContext';
import { logout } from '../../services/authService';

const Navbar = () => {
    const { user, loading } = useAuth();
    const { t, i18n } = useTranslation();
    const [active, setActive] = useState('navBar');
    const navigate = useNavigate();

    // Function to toggle navBar
    const showNav = () => {
        setActive('navBar activeNavbar')
    };

    // Function to remove navBar
    const removeNavbar = () => {
        setActive('navBar')
    };

    // Function change language
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleLogout = () => {
        const callApiLogout = async () => {
            try {
                console.log(user);
                await logout();
                navigate("/");
            } catch (err) {
                console.error(err);
            }
        };
        callApiLogout();
    };

    if (loading) {
        return;
    }

    return (
        <>
            <section className='navBarSection'>
                <header className='header flex'>

                    <div className='logoDiv'>
                        <Link to={'/'} className='logo flex' onClick={scrollToTop}>
                            <h1><img src={logo} alt="Logo" /> Travel.</h1>
                        </Link>
                    </div>

                    <div className={active}>
                        <ul className="navLists flex">

                            <li className="navItem">
                                <Link to={'/'} className="navLink" onClick={scrollToTop}>{t('home')}</Link>
                            </li>

                            <li className="navItem">
                                <a href="#tours" className="navLink">{t('tours')}</a>
                            </li>

                            <li className="navItem">
                                <a href="#shop" className="navLink">{t('shop')}</a>
                            </li>

                            <li className="navItem">
                                <a href="#pages" className="navLink">{t('pages')}</a>
                            </li>

                            <li className="navItem">
                                <a href="#news" className="navLink">{t('news')}</a>
                            </li>

                            <li className="navItem">
                                <a href="#contact" className="navLink">{t('contact')}</a>
                            </li>

                            <li className="navItem">
                                <a href="#lang" className="navLink dropbtn">{t('language')}</a>
                                <div className="dropdown-lang">
                                    <a href="#vi" onClick={() => changeLanguage('vi')}>{t('vietnamese')}</a>
                                    <a href="#en" onClick={() => changeLanguage('en')}>{t('english')}</a>
                                </div>
                            </li>

                            {!user && (
                                <Link to={'/login'}>
                                    <button className='btn'>
                                        {t('book now')}
                                    </button>
                                </Link>
                            )}

                            {user && (
                                <button className='btn' onClick={handleLogout}>
                                    Đăng xuất
                                </button>
                            )}
                        </ul>

                        <div onClick={removeNavbar} className="closeNavbar">
                            <AiFillCloseCircle className="icon" />
                        </div>
                    </div>

                    <div onClick={showNav} className="toggleNavbar">
                        <TbGridDots className="icon" />
                    </div>

                </header>
            </section>
            <BtnScrollToTop />
        </>
    );
}

export default Navbar;
