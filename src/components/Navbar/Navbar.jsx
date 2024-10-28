import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './navbar.scss';
import logo from '../../assets/images/logo.png';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';

const Navbar = () => {
    const { t } = useTranslation();
    const [active, setActive] = useState('navBar');

    // Function to toggle navBar
    const showNav = () => {
        setActive('navBar activeNavbar')
    };

    // Function to remove navBar
    const removeNavbar = () => {
        setActive('navBar')
    };

    return (
        <section className='navBarSection'>
            <header className='header flex'>

                <div className='logoDiv'>
                    <a href='#' className='logo flex'>
                        <h1><img src={logo} alt="Logo" /> Travel.</h1>
                    </a>
                </div>

                <div className={active}>
                    <ul className="navLists flex">

                        <li className="navItem">
                            <a href="#" className="navLink">{t('home')}</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">{t('tours')}</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">{t('shop')}</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">{t('about')}</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">{t('pages')}</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">{t('news')}</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">{t('contact')}</a>
                        </li>

                        <button className='btn'>
                            <a href="#">{t('book now')}</a>
                        </button>
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
    );
}

export default Navbar;
