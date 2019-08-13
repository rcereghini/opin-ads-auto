import React from 'react';
import { Link } from 'react-router-dom'

import CustomButton from '../../components/custom-button/custom-button.component'
import BackButton from '../../components/back-button/back-button.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'


import './get-started-info.styles.scss'

const GetStartedInfo = () => (
    <div className='getStartedInfo'>
        <BackButton linkUrl='/'></BackButton>
        <h1 style={{fontSize: '80px'}}>Opin Ads</h1>
        <h1>Simple ad creation. Fast setup. Rapid lead notifications.</h1>
        <h2>$299.99</h2>
        <p style={{ width: '90%', margin: '0 auto'}}>These leads are going to be so amazing. This is three sentences about how awesome it is. Here is that third sentence.These leads are going to be so amazing. This is three sentences about how awesome it is. Here is that third sentence.These leads are going to be so amazing. This is three sentences about how awesome it is. Here is that third sentence.</p>
        <h2>Get Started Now! Choose your sign up method:</h2>
        <div className='getStartedInfoButtons'>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>GOOGLE</CustomButton>
            <CustomButton>FACEBOOK</CustomButton>
            <Link to='/signup'>
                <CustomButton style={{width: '100%'}}>EMAIL</CustomButton>
            </Link>
        </div>
            <CustomButton style={{position: 'absolute', bottom: 0, right: 0, height: '60px', width: '60px'}}>CHAT</CustomButton>
    </div>
)

export default GetStartedInfo;