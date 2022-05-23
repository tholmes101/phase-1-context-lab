/* Your Code Here */
const createEmployeeRecord = employeeArr => {
    const [firstName, familyName, title, payPerHour] = employeeArr

    const record = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }

    return record
}

const createEmployeeRecords = employeeRecordsArr => {
    return employeeRecordsArr.map(record => createEmployeeRecord(record))
}

const createTimeInEvent = function(dateTime) {
    const [date, time] = dateTime.split(' ')

    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(time),
        date: date
    })

    return this
}

const createTimeOutEvent = function(dateTime) {
    const [date, time] = dateTime.split(' ')

    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(time),
        date: date
    })

    return this
}

const hoursWorkedOnDate = function(date) {
    const clockIn = this.timeInEvents.find(event => event.date == date)
    const clockOut = this.timeOutEvents.find(event => event.date == date)

    return (clockOut.hour - clockIn.hour) / 100
}

const wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(record => record.firstName == firstName)
}

const calculatePayroll = employeeRecordsArr => {
    return employeeRecordsArr.reduce((wages, record) => {
        return wages + allWagesFor.call(record)
    }, 0)
}  

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

