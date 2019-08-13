import React from 'react';

import { Link } from 'react-router-dom';

import './back-button.styles.scss'

const BackButton = (props) => (
    <div className='backButton'>
        <Link to={props.linkUrl}>Back</Link>
    </div>
)

export default BackButton;