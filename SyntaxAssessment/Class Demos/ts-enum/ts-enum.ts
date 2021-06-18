enum Directions {
    Up,
    Down,
    Left,
    Right
}

console.log(Directions)
console.log(Directions[1])
console.log(Directions.Up)

function f1 (where : Directions) {
    console.log(where == Directions.Up)
}

f1(Directions.Left)
f1(Directions.Up)

f1(666) // WTF!