module.exports = {
    changeToMidnight: function (date, up) {
        const newDate = this.getDateObject(date);
        newDate.setDate(this.getMidNightDate(newDate, up));
        newDate.setHours(0, 0, 0, 0);
        return newDate;
    },
    getDateObject: function (date) {
        return new Date(date.getTime());
    },
    getMidNightDate: function (date, up) {
        return date.getDate() + (up ? 1 : -1)
    }
};
