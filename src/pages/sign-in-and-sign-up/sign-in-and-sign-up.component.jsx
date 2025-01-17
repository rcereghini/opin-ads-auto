import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'
import BackButton from '../../components/back-button/back-button.component'

import './sign-in-and-sign-up.styles.scss'

const SignInAndSignUpPage = () => (
    <div>
        <BackButton linkUrl='/'></BackButton>
        <div className='sign-in-and-sign-up'>
            <SignIn/><SignUp/>
        </div>
    </div>
);

export default SignInAndSignUpPage;