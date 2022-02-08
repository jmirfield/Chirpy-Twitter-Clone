export const date = (time) => {
    //Gets number of milliseconds since epoch
    const now = Math.floor(new Date().getTime())

    //Gets chirp post timestamp in milliseconds since epoch
    const postTime = Math.floor(new Date(time).getTime())

    //Difference provides when post was created relative to now in seconds
    const difference = (now/1000) - (postTime/1000)

    if(difference < 60)return `${Math.ceil(difference)}s`
    else if((difference/60) < 60) return `${Math.floor(difference/60)}m`
    else if((difference/3600) < 24) return `${Math.floor(difference/3600)}h`
    else if((difference/(3600*24) < 365)){
        const dateString = new Date(time).toString()
        const month = dateString.substring(4,7)
        const day = Number.parseInt(dateString.substring(8,10))
        const format = month + ' ' + day
        return format
    }
}