const whatIsInAName = (collection, source) => {
    const sourceKeys = Object.keys(source);

    return collection.filter(item =>
        sourceKeys.every(key => item.hasOwnProperty(key) && item[key] === source[key])
    );
};

console.log(
    whatIsInAName(
        [
            {first: "Romeo", last: "Montague"},
            {first: "Mercutio", last: null},
            {first: "Tybalt", last: "Capulet"},
        ],
        {last: "Capulet"}
    )
);