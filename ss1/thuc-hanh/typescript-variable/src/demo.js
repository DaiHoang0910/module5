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
let arr1 = [1,2];
let arr2 = [3,4];
let arr = [...arr1];
arr1[1]=5;
console.log(arr)
console.log(arr1);

let obj1 = {
    id:1,
    name: "Hai"
}

let obj2 = {
    address:"QN",
    id: 3,
    ...obj1
}
console.log(obj2)

// destructuring
// let [a, ...arr] = arr2;
// let {id, name}=obj1;