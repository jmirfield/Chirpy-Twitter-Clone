import React, { useEffect, useState } from 'react'
import LoadingFeed from '../Loading/LoadingFeed'
import Card from '../UI/Card/Card'

const FollowCard = () => {
  useEffect(() => {

  }, [])
  return (
    <Card>
      <h2>Who to follow</h2>
      <LoadingFeed height={30} width={30} />
    </Card>
  )
}

export default FollowCard