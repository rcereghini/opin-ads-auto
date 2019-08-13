import React from 'react';

import SignUp from '../../components/sign-up/sign-up.component'
import BackButton from '../../components/back-button/back-button.component'

import './sign-up-only.styles.scss'

const SignUpOnlyPage = () => (
    <div>
        <BackButton linkUrl='/getstarted'></BackButton>
        <div className='sign-up-only'>
            <SignUp/>
        </div>
    </div>
);

export default SignUpOnlyPage;