import React, { useState, useEffect } from 'react'

const useRelationship = (request) => {
    const [relationships, setRelationships] = useState({ loading: true, list: [] })
    const populateHandler = (users) => setRelationships({ loading: false, list: users })
    useEffect(() => {
        request(populateHandler)
    }, [])
    return relationships
}

export default useRelationship