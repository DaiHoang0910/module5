const getInfo = (obj) => {
    const firstName = obj.firstName || "Quân";
    const degree = obj.degree || "NA";

    console.log(`${firstName} , ${degree}`);
};

const sv1 = {
    firstName: "John",
    gender: "male",
    degree: "Bachelor",
    language: "English"
}

const sv2 = {
    gender: "male",
    language: "Spanish"
}

getInfo(sv1);
getInfo(sv2);
