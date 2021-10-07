module.exports = class HarshedNumber {
    static main() {
        const MAX_HARSHED_NUMBER = 1000; // limit the seq of Harshad numbers
        for (let number = 1; number <= MAX_HARSHED_NUMBER; number++) {
            if (number % HarshedNumber.getDigitSum(number) === 0) {
                console.log(number);
            }
        }
    }

    static getDigitSum(number) {
        let sum = 0;
        while (number > 0) {
            sum += number % 10;
            number = number / 10;
        }
        return sum;
    }
};

