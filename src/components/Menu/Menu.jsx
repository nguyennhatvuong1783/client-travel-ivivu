import React, { useState } from 'react';
import './menu.css';
import TourList from '../TourList/TourList';
import { IoFilter } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import { AiFillCloseCircle } from 'react-icons/ai';

const Menu = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('filterContainer');

  const showFilter = () => {
    setActiveFilter('filterContainer activeFilter');
  }

  const closeFilter = () => {
    setActiveFilter('filterContainer');
  }

  return (
    <>
      <ul className={activeFilter}>
        <li className='filterTitle'>Loại Tours
          <ul className='filter'>
            <li className='item'>Tour Trọn Gói</li>
            <li className='item'>Tour Trọn Gói</li>
            <li className='item'>Tour Trọn Gói</li>
          </ul>
        </li>
        <li className='filterTitle'>Loại Tours
          <ul className='filter'>
            <li className='item'>Tour Trọn Gói</li>
            <li className='item'>Tour Trọn Gói</li>
            <li className='item'>Tour Trọn Gói</li>
          </ul>
        </li>
        <li className='filterTitle'>Loại Tours
          <ul className='filter'>
            <li className='item'>Tour Trọn Gói</li>
            <li className='item'>Tour Trọn Gói</li>
            <li className='item'>Tour Trọn Gói</li>
          </ul>
        </li>
        <li className='filterTitle'>Loại Tours
          <ul className='filter'>
            <li className='item'>Tour Trọn Gói</li>
            <li className='item'>Tour Trọn Gói</li>
            <li className='item'>Tour Trọn Gói</li>
          </ul>
        </li>
        <li className='filterTitle'>Loại Tours
          <ul className='filter'>
            <li className='item'>Tour Trọn Gói</li>
            <li className='item'>Tour Trọn Gói</li>
            <li className='item'>Tour Trọn Gói</li>
          </ul>
        </li>
        <li className='filterTitle'>Loại Tours
          <ul className='filter'>
            <li className='item'>Tour Trọn Gói</li>
            <li className='item'>Tour Trọn Gói</li>
            <li className='item'>Tour Trọn Gói</li>
          </ul>
        </li>

        <div onClick={closeFilter} className="closeFilter">
          <AiFillCloseCircle className="icon" />
        </div>
      </ul>
      <TourList />
      <div onClick={showFilter} className="filterOption">
        <IoFilter className='icon' /> <span>{t('options')}</span>
      </div>
    </>
  );
}

export default Menu;