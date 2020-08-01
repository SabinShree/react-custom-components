function capitalizeFirstLetterOnly([firstLetter, ...rest]) {
    return [firstLetter.toLocaleUpperCase(), ...rest].join('');
}

function convertLongTimeToDateTime(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var formattedDate = date + ' ' + month + ' ' + year;
    var formattedTime = hour + ':' + min + ':' + sec;
    return {formattedDate, formattedTime};
}

export {capitalizeFirstLetterOnly, convertLongTimeToDateTime};