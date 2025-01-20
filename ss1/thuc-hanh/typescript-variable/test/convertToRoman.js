const convertToRoman = (num) => {
    const table = {
        1000: "M",
        900: "CM",
        500: "D",
        400: "CD",
        100: "C",
        90: "XC",
        50: "L",
        40: "XL",
        10: "X",
        9: "IX",
        5: "V",
        4: "IV",
        1: "I",
    };

    const keys = Object.keys(table)
        .map(Number)
        .sort((a, b) => b - a);

    let ans = "";
    keys.forEach((key) => {
        while (num >= key) {
            ans += table[key];
            num -= key;
        }
    });
    return ans;
}

console.log(convertToRoman(36))