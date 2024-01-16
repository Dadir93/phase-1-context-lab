const createEmployeeRecord = function ([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
};

const createEmployeeRecords = function (employeeData) {
    return employeeData.map(createEmployeeRecord);
};

const createTimeInEvent = function (employee, timeStamp) {
    if (timeStamp && timeStamp.split) {
        const [date, hour] = timeStamp.split(' ');
        employee.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour), date });
    }
    return employee;
};

const createTimeOutEvent = function (employee, timeStamp) {
    if (timeStamp && timeStamp.split) {
        const [date, hour] = timeStamp.split(' ');
        employee.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour), date });
    }
    return employee;
};

const hoursWorkedOnDate = function (employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeIn && timeOut) ? (timeOut.hour - timeIn.hour) : 0;
};

const wagesEarnedOnDate = function (employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
};

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(this, d);
    }.bind(this), 0);

    return payable;
};

const calculatePayroll = function (employeeRecords) {
    return employeeRecords.reduce(function (totalPayroll, employee) {
        return totalPayroll + allWagesFor.call(employee);
    }, 0);
};

// Create three employee records with initial time events and pay rates
const employee1 = createEmployeeRecord(['John', 'Doe', 'Developer', 20]);
createTimeInEvent(employee1, '2022-01-01 0900');
createTimeOutEvent(employee1, '2022-01-01 1700');

const employee2 = createEmployeeRecord(['Jane', 'Smith', 'Designer', 25]);
createTimeInEvent(employee2, '2022-01-02 1000');
createTimeOutEvent(employee2, '2022-01-02 1800');

const employee3 = createEmployeeRecord(['Bob', 'Johnson', 'Manager', 30]);
createTimeInEvent(employee3, '2022-01-03 0800');
createTimeOutEvent(employee3, '2022-01-03 1600');

// Add the employees to an array
const employees = [employee1, employee2, employee3];

// Calculate total payroll for all employees
console.log(`Total payroll for all employees: $${calculatePayroll(employees)}`);
