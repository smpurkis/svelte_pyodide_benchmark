<script>
	import { runNumjsBenchmark, runRawFloatArrayBenchmark } from "./benchmark"
	import { runPythonArrayBenchmark } from "./pythonGlueCode"

	let inputBarValue = 7000

	async function exp(x) {
		return Math.round(Math.pow(10, x/1000))
	}
	$: arrSize = exp(inputBarValue)

	let pythonReturn = runPythonArrayBenchmark(exp(inputBarValue));
	let numjsReturn = runNumjsBenchmark(exp(inputBarValue));
	let rawFloatArrayReturn = runRawFloatArrayBenchmark(exp(inputBarValue));

	async function runBenchmark() {
		pythonReturn = await runPythonArrayBenchmark(exp(inputBarValue));
		numjsReturn = await runNumjsBenchmark(exp(inputBarValue));
		rawFloatArrayReturn = await runRawFloatArrayBenchmark(exp(inputBarValue));
	}
	runBenchmark()
</script>

<main>
	<input type="range" name="log-input" id="log-input" bind:value={inputBarValue} min="1000" max="8000">
	{#await arrSize}
		<p>Array Length of Random Numbers is: Loading...</p>
	{:then value}
		<p>Array Length of Random Numbers is: {value}</p>
	{/await}
	<button on:click={runBenchmark}>Run Benchmark</button>
	<br>

	{#await pythonReturn}
		<p>loading python</p>
	{:then pythonResult}
	<p>This ran in Python compiled in Web Assembly in the browser in: {Math.round(pythonResult[0] * 100) / 100}.0 ms, with result: {pythonResult[1]}</p>
	{/await}
	
	{#await numjsReturn}
		<p>loading numjs</p>
	{:then numjsResult}
	<p>This ran using package NumJS, in: {Math.round(numjsResult[0] * 100) / 100} ms, with result: {numjsResult[1]}</p>
	{/await}

	{#await rawFloatArrayReturn}
		<p>loading rawFloatArray</p>
	{:then rawFloatArrayResult}
	<p>This ran in using Float64Array in JS, it ran in: {Math.round(rawFloatArrayResult[0] * 10) / 10} ms, with result: {rawFloatArrayResult[1]}</p>
	{/await}
</main>
