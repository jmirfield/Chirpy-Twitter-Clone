import { useReducer, useEffect, useRef } from 'react'
import { initialState, reducer } from '../reducers/feedReducer';

const useFeed = (request) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const ref = useRef(state)

    useEffect(() => {
        request(state.query, dispatch)
    }, [state.query])

    useEffect(() => {
        const onScroll = function () {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                if (state.query && state.feed.length > 0) dispatch({ type: 'LOAD_MORE' })
            }
        }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [state])

    return [state, dispatch]
}

export default useFeed