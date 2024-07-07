<script lang="ts">
	import type { FaaRunwayResponse } from '$lib/apiTypes';
	import AirportDiagram from '$lib/components/AirportDiagram.svelte';
	import { onMount } from 'svelte';

	let width = 400;
	let height = 400;
	let margin = { top: 10, right: 10, bottom: 10, left: 10 };
	let runwayData: FaaRunwayResponse | null = null;
	let airport = 'atl';

	// Function to fetch airport data
	async function getAirportData(airport: string) {
		const runwayData = await fetch(`/api/airport/${airport}/runways`);
		const runwayDataJson: FaaRunwayResponse = await runwayData.json();
		return runwayDataJson;
	}

	onMount(async () => {
		runwayData = await getAirportData(airport);
	});
</script>

<div id={`${airport}-diagram`}>
	<AirportDiagram {width} {height} {margin} {runwayData} />
</div>
