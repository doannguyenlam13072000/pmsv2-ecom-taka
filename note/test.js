const myFunc = () => {
  let num = 0;
  console.time("time");
  for (let i = 0; i < 10000000000; i++) {
    num += i;
  }
  console.timeEnd("time");
  console.log("myFunc", num);
};

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
    return count++;
  };

  return increment;
};

const temp = closure();

console.log(temp());
console.log(temp());

console.log(diff());
function diff() {
  const a = 1;
  this.a = a;
}

// console.log(sum());
// const sum = () => {
//     console.log("Sum");
// }

const array = [5, 4, 8, 1, 4, 7];
((array) => {
  console.log("BUBBLE SORT");
  for (let i = 0; i < array.length; i++) {
    console.log("\ni", i);
    for (let k = 0; k < array.length - i - 1; k++) {
      console.log("\tk", k);
      console.log("\tbefore", array);
      if (array[k] > array[k + 1]) {
        console.log("\t  swap", array[k], array[k + 1]);
        let temp = array[k];
        array[k] = array[k + 1];
        array[k + 1] = temp;
        console.log("=> result", array);
      }
    }
  }
  console.log(array);
})(array);

const selectionSort = (array) => {
  console.log("SELECTION SORT");
  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i;
    for (let k = i + 1; k < array.length; k++) {
      if (array[k] < array[minIdx]) {
        minIdx = k;
      }
    }

    if (minIdx !== i) {
      let temp = array[i];
      array[i] = array[minIdx];
      array[minIdx] = temp;
    }
  }
  return array;
};
console.log(selectionSort(array));

const binarySearch = (array, target) => {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (array[mid] === target) {
      return mid;
    } else if (array[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
};

console.log("Binary Search", binarySearch(selectionSort(array), 5));
