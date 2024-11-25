import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    const { t } = useTranslation();

    const sidebarNavItems = [
        {
            display: t('Statistical'),
            icon: <i className='bx bx-home'></i>,
            to: 'statistical',
            section: 'statistical'
        },
        {
            display: t('Booking'),
            icon: <i className='bx bx-star'></i>,
            to: 'booking',
            section: 'booking'
        },
        {
            display: t('Tour package'),
            icon: <i className='bx bx-calendar'></i>,
            to: 'tour_package',
            section: 'tour_package'
        },
        {
            display: t('Destination'),
            icon: <i className='bx bx-user'></i>,
            to: 'destination',
            section: 'destination'
        },
        {
            display: t('Tour date'),
            icon: <i className='bx bx-receipt'></i>,
            to: 'tour_date',
            section: 'tour_date'
        },
        {
            display: t('Users'),
            icon: <i className='bx bx-receipt'></i>,
            to: 'users',
            section: 'users'
        },
        {
            display: t('Promotion'),
            icon: <i className='bx bx-receipt'></i>,
            to: 'promotion',
            section: 'promotion'
        },
        {
            display: t('Review'),
            icon: <i className='bx bx-receipt'></i>,
            to: 'review',
            section: 'review'
        },
        {
            display: t('Activity'),
            icon: <i className='bx bx-receipt'></i>,
            to: 'activity',
            section: 'activity'
        },
        {
            display: t('Tour Guide'),
            icon: <i className='bx bx-receipt'></i>,
            to: 'tour_guide',
            section: 'tour_guide'
        },
        {
            display: t('Accommodation'),
            icon: <i className='bx bx-receipt'></i>,
            to: 'accommodation',
            section: 'accommodation'
        },
        {
            display: t('Vehicle'),
            icon: <i className='bx bx-receipt'></i>,
            to: 'vehicle',
            section: 'vehicle'
        },
        {
            display: t('Company'),
            icon: <i className='bx bx-receipt'></i>,
            to: 'company',
            section: 'company'
        },
    ]

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = location.pathname.split('/dashboard/')[1] || '';
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(activeItem >= 0 ? activeItem : 0);
    }, [location, sidebarNavItems]);

    return <div className='sidebar'>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default Sidebar;