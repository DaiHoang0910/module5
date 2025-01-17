const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    gender: "male",
    occupation: "developer",
    nationality: "American",
    city: "New York",
    hobbies: ["reading", "traveling", "photography"],
    language: ["English", "Spanish"],
    education: {
        degree: "Bachelor",
        major: "Computer Science",
        university: "Harvard University",
    }
}
console.log(person)

const student = {
    firstName: person.firstName,
    gender: person.gender,
    degree: person.education.degree,
    language: person.language.find(lang => lang === "English"),
}

console.log(student)