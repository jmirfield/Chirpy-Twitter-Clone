import React from 'react'
import useRelationship from '../../hooks/useRelationship'
import { getRecommendedFollowersRequest } from '../../actions/profile'
import LoadingFeed from '../Loading/LoadingFeed'
import ProfileList from '../Profile/ProfileList'
import Card from '../UI/Card/Card'
import styles from './styles.module.css'

const FollowCard = (props) => {
  const recommendedList = useRelationship(getRecommendedFollowersRequest)

  const cardClass = props.onExplore
    ? styles['sidebar__follow-on']
    : styles['sidebar__follow-off']

  if (recommendedList.loading) return (
    <Card className={cardClass}>
      <LoadingFeed height={30} width={30} />
    </Card>
  )

  return (
    <Card className={cardClass}>
      <h2>Who to follow</h2>
      <ProfileList users={recommendedList.list} />
    </Card>
  )
}

export default FollowCard