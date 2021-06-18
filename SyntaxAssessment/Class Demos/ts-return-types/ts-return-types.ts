function f1 ( a: number, b: number ): number {
    return a * b
}

console.log(f1(42, 666))

function f2 ( a: number, b: number ): string {
    return '' + a * b
}

console.log(f2(42, 666))

function f3 ( a: number, b: number): void {
    console.log( a * b)
}

f3(42, 666)