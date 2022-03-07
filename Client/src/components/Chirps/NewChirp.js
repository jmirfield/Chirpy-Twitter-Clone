import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { newChirpRequest, newChirpRequestWithImage, replyRequest } from '../../actions/chirps'
import AuthContext from '../../context/AuthContext'
import ChirpInput from '../UI/ChirpInput/ChirpInput'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import ChirpReplyHeader from './ChirpReplyHeader'
import styles from './NewChirp.module.css'

const NewChirp = (props) => {
    const { state } = useContext(AuthContext)
    const [textInput, setTextInput] = useState('')
    const [image, setImage] = useState(null)

    const textChangeHandler = (e) => setTextInput(e.target.value)

    const resetHandler = () => {
        setTextInput('')
        setImage(null)
    }

    const stageImageHandler = (e) => {
        e.preventDefault()
        setImage({ blob: URL.createObjectURL(e.target.files[0]), data: e.target.files[0] })
        e.target.value = ''
    }

    const cancelStagedImageHandler = () => setImage(null)

    const onSubmitChirpHandler = (e) => {
        e.preventDefault()
        if (textInput.trim().length > 0 && !image && !props.isReply) {
            newChirpRequest(textInput, props, { user: state.user, profileImage: state.profileImage })
        }
        if (image && !props.isReply) {
            const data = new FormData()
            data.append('text', textInput)
            data.append('image', image.data)
            newChirpRequestWithImage(data, props, { user: state.user, profileImage: state.profileImage })
        }
        if (props.isReply) {
            if (textInput.trim().length > 0 && !image) {
                replyRequest(textInput, props, { user: state.user, profileImage: state.profileImage })
            }
            if (image) {
                const data = new FormData()
                data.append('text', textInput)
                data.append('image', image.data)
                replyRequestWithImage(data, props, { user: state.user, profileImage: state.profileImage })
            }
        }
        resetHandler()
    }

    const newChirpClass = props.className
        ? `${props.className} ${styles['new-chirp']}`
        : styles['new-chirp']

    return (
        <section className={newChirpClass}>
            <ProfileImage
                className={styles['new-chirp__icon']}
                src={state.profileImage}
            />
            <section className={styles['new-chirp__input']}>
                {props.isReply && <ChirpReplyHeader username={props.owner.username}/>}
                <ChirpInput
                    onSubmit={onSubmitChirpHandler}
                    text={textInput}
                    image={image}
                    onChange={textChangeHandler}
                    onImage={stageImageHandler}
                    onCancel={cancelStagedImageHandler}
                    isReply={props.isReply}
                />
            </section>
        </section>
    )
}

export default NewChirp
