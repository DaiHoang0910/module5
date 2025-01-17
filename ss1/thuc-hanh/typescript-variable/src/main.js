// let width: number;
// let height: number;
//
// width = 10.5;
// height = 20;
//
// let area: number = width*height;
// console.log(`Diện tích hình chữ nhật: ${area}`);
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// console.log(sum(1,2));
//
// // function sum(a,b) {
// //     return a + b;
// // }
//
// const sum = (a,b) => a + b;
// let obj = {
//     a: 1,
//     b: function () {
//         console.log(this)
//     },
//     c: () => {
//         console.log(this)
//     }
// }
//
// obj.b();
// obj.c();
// let arr = [1, 3, 4, 7, 8, 5];
// for (let i = 1; i < arr.length; i++) {
//     console.log(arr[i]);
// }
//
// arr.forEach(function(item) {
//     console.log(item);
// })
//chỉ dùng để duyệt mảng
// arr.forEach((item, index) => console.log(item));
// Dùng để lọc các phần tử. Kết quả sẽ cho ra 1 mảng mới
// let newArr = arr.filter((item, index) => index % 2 === 0);
// console.log(newArr)
// DÙng để tạo ra 1 mảng mới
// let newArr2 = arr.map((item, index) => index % 2 === 0 ? item : item * 2);
//
// console.log(newArr2)
//Reduce:
// let sum = arr.reduce((temp, item) => temp + item);
// console.log(sum)
//Tìm giá trị lớn nhất
// let max = arr.reduce((temp, current) => current > temp ? current : temp);
// console.log(max)
//Rest Param
// const sum = (a,b,...arr) => {
//     let sum = 0;
//
// }
//
// sum(1,2,3,4,5,6,7,8,9);
// Spread Operator: mở rộng, sao chép các mảng và đối tượng
var arr1 = [1, 2];
var arr2 = [3, 4];
var arr = __spreadArray([], arr1, true);
arr1[1] = 5;
console.log(arr);
console.log(arr1);
var obj1 = {
    id: 1,
    name: "Hai"
};
var obj2 = __assign({ address: "QN", id: 3 }, obj1);
console.log(obj2);
// destructuring
// let [a, ...arr] = arr2;
// let {id, name}=obj1;
