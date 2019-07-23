import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss'

const HeaderComponent = () => (
    <div className='header'>
        <Link to="/" className='logo-container'>
            Home Link
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/contact'>CONTACT</Link>
        </div>
    </div>
)

export default HeaderComponent;