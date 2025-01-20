const isPrime = num => {
    if (typeof num !== 'number' || !Number.isInteger(num)) return false;
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const filterPrimes = arr => arr.filter(isPrime);

const numbers = [1, 2, 3, 4, 5, 10, 13, 17, 18, 19];
const primeNumbers = filterPrimes(numbers);

console.log(primeNumbers);
