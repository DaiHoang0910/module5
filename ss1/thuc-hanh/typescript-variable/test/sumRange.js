const sumAll = (arr) => {
    const [min, max] = [Math.min(...arr), Math.max(...arr)];
    let ans = 0;
    for (let i = min; i <= max; i++) {
        ans += i;
    }
    return ans;
};

console.log(sumAll([1, 4]));
