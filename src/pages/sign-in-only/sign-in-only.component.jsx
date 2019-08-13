import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component'
import BackButton from '../../components/back-button/back-button.component'

import './sign-in-only.styles.scss'

const SignInOnlyPage = () => (
    <div>
        <BackButton linkUrl='/'></BackButton>
        <div className='sign-in-only'>
            <SignIn/>
        </div>
    </div>
);

export default SignInOnlyPage;