const AGE = 60;
const INTEREST_PERCENT = 4.5;
const SENIOR_PERCENT = 5.5;
const BONUS_AGE = 13;

durationBetweenDates = (startDate, endDate) => {
    const diffYear = endDate.getFullYear() - startDate.getFullYear();
    if ((endDate.getMonth() < startDate.getMonth()) ||
        (endDate.getMonth() === startDate.getMonth() && endDate.getDate() < startDate.getDate())) {
        return diffYear - 1;
    }
    return diffYear;
}

durationBetweenDatesInYears = (fromDate, toDate) => {
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    return durationBetweenDates(startDate, endDate);
}

const durationSinceStartDateInYears = (startDate) => {
    const startDate = new Date(startDate);
    const endDate = new Date();

    return durationBetweenDates(startDate, endDate);
}

const isSeniorCitizen = (age) => {
    return age > AGE;
}

const calculateInterest = (amount, startDate, interestPercentage) => {
    return amount * durationSinceStartDateInYears(startDate) * interestPercentage / 100;
}

const isAccountStartedAfterBonusAge = (accountDetails) => {
    return durationBetweenDatesInYears(accountDetails.getBirth(), accountDetails.getStartDate()) > BONUS_AGE;
}

const getInterestPercentage = (accountDetails) => {
    return isSeniorCitizen(accountDetails.getAge()) ? SENIOR_PERCENT : INTEREST_PERCENT;
}

const accountInterest = (accountDetails) => {
    let balance = accountDetails.getBalance();
    if (isSeniorCitizen(accountDetails.getAge())) {
        balance = balance.doubleValue()
    }
    return calculateInterest(balance, accountDetails.getStartDate(), getInterestPercentage(accountDetails));
}

const caliculateAccountInterest = (accountDetails) => {
    if (isAccountStartedAfterBonusAge(accountDetails)) {
        return accountInterest(accountDetails);
    } else {
        return 0;
    }
}

module.exports = {
    calculateInterest: caliculateAccountInterest,
};
