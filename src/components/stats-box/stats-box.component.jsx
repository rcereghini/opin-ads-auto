import React from 'react';

import './stats-box.styles.scss'

const StatsBox = (props) => {
    return (
        <div className='.statsBox'>
            {
                props.stats.map((stat) => {
                    return (
                        <div className='stat'>
                            <p className='statLabel'>{stat.label}</p><p className='statValue'>{stat.value}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default StatsBox;