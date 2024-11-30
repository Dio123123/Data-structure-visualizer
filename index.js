let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let terminate_btn = document.getElementById("terminate_btn");

let minRange = 10;
let maxRange = 120;
let numOfBars = 30;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);
let isTerminated = false;

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

let algotouse = "";

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }
  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function renderBars(array) {
  bars_container.innerHTML = "";
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bar.innerText = array[i];
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (isTerminated) return;
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "aqua";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].innerText = array[j];
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].innerText = array[j + 1];
        bars[j].style.backgroundColor = "lightgreen";
        bars[j + 1].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
  }
  return array;
}

async function swap(items, leftIndex, rightIndex, bars) {
  let temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
  bars[leftIndex].innerText = items[leftIndex];
  bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
  bars[rightIndex].innerText = items[rightIndex];
  bars[leftIndex].style.backgroundColor = "red";
  bars[rightIndex].style.backgroundColor = "red";
  await sleep(speedFactor);

  for (let k = 0; k < bars.length; k++) {
    if (k !== leftIndex && k !== rightIndex) {
      bars[k].style.backgroundColor = "aqua";
    }
  }
  return items;
}

async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  let pivot = items[pivotIndex]; //middle element
  bars[pivotIndex].style.backgroundColor = "red";

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "aqua";
    }
  }

  let i = left; //left pointer
  let j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars); // swapping two elements
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  if (items.length > 1) {
    let index = await partition(items, left, right); // index returned from partition
    if (left < index - 1) {
      // more elements on the left side of the pivot
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      // more elements on the right side of the pivot
      await quickSort(items, index, right);
    }
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "aqua";
  }
  return items;
}

async function InsertionSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    if (isTerminated) return;
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].innerText = array[j + 1];
      bars[j + 1].style.backgroundColor = "red";
      await sleep(speedFactor);

      for (let k = 0; k < bars.length; k++) {
        if (k != j + 1) {
          bars[k].style.backgroundColor = "aqua";
        }
      }
      j = j - 1;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
    bars[j + 1].innerText = array[j + 1];
    bars[j + 1].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
  }
  return array;
}

async function HeapSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    if (isTerminated) return;
    await heapify(array, array.length, i);
  }
  for (let i = array.length - 1; i >= 0; i--) {
    if (isTerminated) return;
    await swap(array, 0, i, bars);
    await heapify(array, i, 0);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
    await sleep(speedFactor);
  }
  return array;
}

async function heapify(array, n, i) {
  let bars = document.getElementsByClassName("bar");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  if (largest != i) {
    await swap(array, i, largest, bars);
    await heapify(array, n, largest);
  }
}

async function mergeSort(arr) {
  let bars = document.getElementsByClassName("bar");
  if (arr.length < 2) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  await mergeSort(left);
  await mergeSort(right);

  let i = 0;
  let j = 0;
  let k = 0;

  while (i < left.length && j < right.length) {
    if (isTerminated) return;
    if (left[i] < right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].innerText = arr[k];
    bars[k].style.backgroundColor = "lightgreen";
    if (k + arr.length < bars.length) {
      bars[k + arr.length].style.height = arr[k] * heightFactor + "px";
      bars[k + arr.length].style.backgroundColor = "yellow";
    }
    await sleep(speedFactor);
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].innerText = arr[k];
    bars[k].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].innerText = arr[k];
    bars[k].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
    j++;
    k++;
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
  }

  return arr;
}

async function runSort() {
  if (isTerminated) return;
  if (algotouse === "bubble") {
    unsorted_array = await bubbleSort(unsorted_array);
  } else if (algotouse === "quick") {
    unsorted_array = await quickSort(unsorted_array, 0, unsorted_array.length - 1);
  } else if (algotouse === "insertion") {
    unsorted_array = await InsertionSort(unsorted_array);
  } else if (algotouse === "heap") {
    unsorted_array = await HeapSort(unsorted_array);
  } else if (algotouse === "merge") {
    unsorted_array = await mergeSort(unsorted_array);
  }
}

sort_btn.addEventListener("click", function () {
  isTerminated = false;
  runSort();
});

terminate_btn.addEventListener("click", function () {
  isTerminated = true;
});
