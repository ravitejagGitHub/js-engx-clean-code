module.exports = class AccountDetails {
    constructor(dateOfBirth, startDate, balance, age) {
        this.dateOfBirth = dateOfBirth;
        this.startDate = startDate;
        this.balance = balance;
        this.age = age;
    }

    getBirth() {
        return this.dateOfBirth;
    }

    setBirth(dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    getStartDate() {
        return this.startDate;
    }

    setStartDate(startDate) {
        this.startDate = startDate;
    }

    getBalance() {
        return this.balance;
    }

    setBalance(balance) {
        this.balance = balance;
    }

    getAge() {
        return this.age;
    }

    setAge(age) {
        this.age = age;
    }
};
