const myReplace = (str, before, after) => {
    const beforeFirst = before.charAt(0);
    const afterChars = after.split("");

    const words = str.split(" ");
    const answer = words.map(word => {
        if (word === before) {
            afterChars[0] = beforeFirst >= "A" && beforeFirst <= "Z"
                ? afterChars[0].toUpperCase()
                : afterChars[0].toLowerCase();
            return afterChars.join("");
        }
        return word;
    });
    return answer.join(" ");
};

console.log(myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped"))