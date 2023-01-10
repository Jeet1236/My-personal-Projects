
exports.getDate = function () {

    var date = new Date();
    var today = date.getDay();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[today];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December'];
    const formattedDate = currentDay + ',' + monthNames[month] + ' ' + day + ', ' + year;
    return formattedDate;

}
