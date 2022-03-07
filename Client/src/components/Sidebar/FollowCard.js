import React, { useEffect } from 'react'
import LoadingFeed from '../Loading/LoadingFeed'
import Card from '../UI/Card/Card'
import styles from './styles.module.css'

const FollowCard = (props) => {
  useEffect(() => {

  }, [])

  const cardClass = props.onExplore
    ? styles['sidebar__follow-on']
    : styles['sidebar__follow-off']

  return (
    <Card className={cardClass}>
      <h2>Who to follow</h2>
      <LoadingFeed height={30} width={30} />
    </Card>
  )
}

export default FollowCard