import React from 'react';
import './menu.css';
import TourList from '../TourList/TourList';

const Menu = () => {
  return (
    <section className='menu'>
      <ul className='filterContainer'>
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
      </ul>
      <TourList />
    </section>
  );
}

export default Menu;