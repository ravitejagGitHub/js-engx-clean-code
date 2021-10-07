const InvalidInputException = require('./lib/InvalidInputException');

const validateInputs = (principalAmount, termInYears, yearlyInterestRate) => {
    if (principalAmount < 0 || termInYears <= 0 || yearlyInterestRate < 0) {
        throw new InvalidInputException('Negative values are not allowed');
    }
}

exports.calculateMonthlyPayment = (principalAmount, termInYears, yearlyRateOfInterest) => {

    try {
        validateInputs(principalAmount, termInYears, yearlyRateOfInterest);

        // Convert interest rate into a decimal - eg. 6.5% = 0.065
        yearlyRateOfInterest /= 100;

        const termInMonths = termInYears * 12;

        if (yearlyRateOfInterest === 0) return principalAmount / termInMonths;

        const montlyRateOfInterest = yearlyRateOfInterest / 12;

        //Monthly payment calicaluation formula.
        const monthlyPayment = (principalAmount * montlyRateOfInterest) / (1 - Math.pow(1 + montlyRateOfInterest, -termInMonths));
        return monthlyPayment;
    }
    catch (e) {
        console.log(`Invalid Inputs : ${e}`);
        throw e;
    }

}
