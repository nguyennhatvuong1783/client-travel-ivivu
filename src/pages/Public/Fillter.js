import React from 'react';
import CardFilter from '../../components/Home/CardFilter/CardFilter'
import Menu from '../../components/Menu/Menu'

const Fillter = () => {
    return (
        <>
            <div style={{ margin: '12vh 5% 0' }}>
                <CardFilter />
            </div>
            <Menu />
        </>
    );
}

export default Fillter;