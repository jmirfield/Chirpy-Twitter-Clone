import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import styles from './LoadingFeed.module.css'

const LoadingFeed = ({height=80, width=80}) => {
    return (
        <div className={styles['loading']}>
            <TailSpin color="rgb(2, 155, 240)" height={height} width={width} />
        </div>
    )
}

export default LoadingFeed