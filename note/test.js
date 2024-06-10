const myFunc = () => {
    let num = 0
    console.time("time")
    for (let i = 0; i < 10000000000; i++) {
        num += i
    }
    console.timeEnd("time")
    console.log("myFunc", num);
}


// // ====================================
// console.log(1);

// setTimeout(() => {
//     console.log(2);
// }, 2000);


// console.log(3);

// setTimeout(() => {
//     console.log(4);
// }, 0);

// myFunc()


// console.log(5);


const closure = () => {
    let count = 0;

    const increment = () => {
        return count++
    }

    return increment
}

const temp = closure()

console.log(temp());
console.log(temp());

console.log(diff());
function diff(){
    const a = 1
    this.a = a
    console.log("diff", this);
}

// console.log(sum());
// const sum = () => {
//     console.log("Sum");
// }

