/**
 * Converts date string of when post was created into string representing time since post was created relative to now
 * @param  {String} time Date string of when post was created
 * @return {String}      Formatted string representing time since post was created
 */
export const date = (time) => {
    //Converts present time into epoch time format in milliseconds
    const now = Math.floor(new Date().getTime())

    //Converts post time into epoch time format in milliseconds
    const postTime = Math.floor(new Date(time).getTime())

    //Calculates difference between now and post creation time in seconds
    const difference = (now/1000) - (postTime/1000)

    //If less than 60 seconds
    if(difference < 60)return `${Math.ceil(difference)}s`
    //If less than 1 hour
    else if((difference/60) < 60) return `${Math.floor(difference/60)}m`
    //If less than 1 day
    else if((difference/3600) < 24) return `${Math.floor(difference/3600)}h`
    //if less than 1 year
    else if((difference/(3600*24) < 365)){
        const dateString = new Date(time).toString()
        const month = dateString.substring(4,7)
        const day = Number.parseInt(dateString.substring(8,10))
        const format = month + ' ' + day
        return format
    }
}