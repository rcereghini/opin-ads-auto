import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils'

import './header.styles.scss'

const HeaderComponent = ({ currentUser }) => (
    <div className='header'>
        <Link to="/" className='logo-container'>
            Home Link
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/contact'>CONTACT</Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
        </div>
    </div>
)

export default HeaderComponent;