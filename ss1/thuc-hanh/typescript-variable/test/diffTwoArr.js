const diffArray = (arr1, arr2) => {
    const isExist = (item, arr) => arr.includes(item);

    const newArr = [];
    arr1.forEach(val => {
        if (!isExist(val, arr2)) newArr.push(val);
    });
    arr2.forEach(val => {
        if (!isExist(val, arr1)) newArr.push(val);
    });

    return newArr;
}

const newArr1 = [1, 2, 3, 5];
const newArr2 = [1, 2, 3, 4, 5];
console.log(diffArray(newArr1, newArr2));