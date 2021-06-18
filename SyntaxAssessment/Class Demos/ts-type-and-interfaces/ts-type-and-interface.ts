interface Person {
    firstName: string
}

interface Person {
    lastName: string
}

interface Person {
    age: number
}

type Hobbit = {
    firstName: string
    lastName: string
    age: number
}

/*
NOPE!

duplicate type error
type Hobbit = {}
    age: number
}

*/

function f1(p : Person): void {
    console.log(p.age, p.firstName, p.lastName)
}

f1({firstName: 'Bilbo', lastName: 'Baggins', age: 9012})

function f2(p : Hobbit): void {
    console.log(p.age, p.firstName, p.lastName)
}

f2({firstName: 'Bilbo', lastName: 'Baggins', age: 9012})