async function getPythonCode() {
    let python_code = await (await fetch("./code.py")).text();
    return python_code;
}

async function loadPython() {
    let pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
    });
    await pyodide.loadPackage("numpy");
    return pyodide
}
let pyodideLoad = loadPython();

export async function runPythonArrayBenchmark(arraySize) {
    let python_code = await getPythonCode();
    let pyodide = await pyodideLoad;
    globalThis.array_size = await arraySize
    await pyodide.runPython(python_code)
    let return_values = [await pyodide.globals.get("time_taken"), await pyodide.globals.get("output")];
    pyodide = null
    return return_values
}

export async function runPythonCode(array_size) {
    let python_code = await getPythonCode();
    let pyodide = await pyodideLoad;

    await pyodide.runPython(python_code)
    return [await pyodide.globals.get("time_taken"), await pyodide.globals.get("output")];
}