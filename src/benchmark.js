import "numjs"


async function timeit(fn, iterations=10, ...args) {
    let start = performance.now();
    let output = [];
    for (let i = 0; i < iterations; i++) {
        output = await fn(...args);
    }
    let end = performance.now();
    let timeTaken = end - start
    console.log(`js function ${fn} timeit: ${timeTaken}`);
    return [timeTaken, output]
}

function create_array(arrSize) {
    let arr = new Float64Array(arrSize);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.random();
    }
    return arr;
}

async function sum_array(arr) {
    return arr.reduce((a, b) => a + b)
}

let arr = nj.random(100);
export async function runNumjsBenchmark(arrSize) {
    let arr = nj.random(await arrSize);
    let output = await timeit(nj.sum, 1, arr);
    return output
}

export async function runRawFloatArrayBenchmark(arrSize) {
    let arr = create_array(await arrSize);
    let output = await timeit(sum_array, 1, arr);
    return output
}