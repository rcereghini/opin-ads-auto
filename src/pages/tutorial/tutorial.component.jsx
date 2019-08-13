import React from 'react';

import './tutorial.styles.scss'

const TutorialPage = () => (
    <div>
        <h2 style={{textAlign: 'center', position: 'absolute', top: 0, width: '100%'}}>Let's Get Started - 1/5</h2>
        <h1 style={{marginTop: '5em'}}>How would you like to receive your leads?</h1>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: '4em', marginLeft: '2em'}}>
            <p className='receiveMethodButtons'>Text</p>
            <p className='receiveMethodButtons'>Email</p>
            <p className='receiveMethodButtons'>Notification</p>
        </div>
    </div>
);

export default TutorialPage;