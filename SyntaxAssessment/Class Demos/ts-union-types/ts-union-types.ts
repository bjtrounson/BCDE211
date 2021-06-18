function f1 (where: 'Up'|'Down'|'left'|'Right'){
    console.log(where)
}

f1('Up')
f1(666)

type Directions = 
    | 'Up'
    | 'Down'
    | 'Left'
    | 'Right'

function f2 (where: Directions): void {
    console.log(where)
}

f2('Up') // :-)
f2(Directions.Up) // :-(
f2(42) // :-(
