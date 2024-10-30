import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './cardfilter.scss';
import { GrLocation } from 'react-icons/gr';
import { HiFilter } from 'react-icons/hi';
import { formatCurrency } from '../../../utils/CurrencyUtils';
import Aos from 'aos';

const CardFilter = () => {
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
    );
}

export default CardFilter;