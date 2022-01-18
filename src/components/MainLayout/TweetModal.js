import React from 'react'
import Modal from '../UI/Modal/Modal'
import NewTweet from '../Tweets/NewTweet'

const TweetModal = (props) => {
    return (
        <Modal onClick={props.onClose}>
            <NewTweet />
        </Modal>
    )
}

export default TweetModal
