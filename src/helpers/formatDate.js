const formatDate = () => {
    let date = new Date()
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return month + ' ' + day + ' ' + year;
}

export default formatDate;