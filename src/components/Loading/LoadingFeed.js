import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import classes from './LoadingFeed.module.css'

const LoadingFeed = () => {
    return (
        <div className={classes['loading']}>
            <TailSpin color="rgb(2, 155, 240)" height={80} width={80} />
        </div>
    )
}

export default LoadingFeed