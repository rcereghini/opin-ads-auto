import React from 'react';
import {Link} from 'react-router-dom'

import Directory from '../../components/directory/directory.component'
import CustomButton from '../../components/custom-button/custom-button.component'

import './homepage.styles.scss'


const HomePage = () => (
    <div className='homepage'>
        {/* <Directory></Directory> */}
            <div className='homepageTitleWrap'>
                <h1 className='homepageTitle'>Opin Ads</h1>
            </div>
            <div className='homepageBottomRow'>
                <div>
                    <p style={{fontSize: '24px'}}>This is the most amazing site ever. You will love giving us your money. Get ready to have your mind blown by pure awesomeness. The only thing more awesome is you, so click that link.</p>
                </div>
                <div>
                    <Link to='/getstarted/'>
                        <CustomButton>Get Started</CustomButton>
                    </Link>
                </div>
                <div>
                    <Link to='/signin/'>
                        <CustomButton>Welcome Back</CustomButton>
                    </Link>
                </div>
            </div>
    </div>
)

export default HomePage;