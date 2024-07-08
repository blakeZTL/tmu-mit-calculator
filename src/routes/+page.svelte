<script lang="ts">
	import type { FaaRunwayResponse } from '$lib/apiTypes';
	import FixCard from '$lib/components/FixCard.svelte';
	//import AirportDiagram from '$lib/components/AirportDiagram.svelte';
	import LoadingCards from '$lib/components/LoadingCards.svelte';
	import { onMount } from 'svelte';

	export let data;

	// let width = 100;
	// let height = 100;
	// let margin = { top: 10, right: 10, bottom: 10, left: 10 };
	let runwayData: FaaRunwayResponse | null = null;
	let airport = 'atl';
	// let selectedAirport = 'ATL';
	let checked = false;

	// Function to fetch airport data
	async function getAirportData(airport: string) {
		const runwayData = await fetch(`/api/airport/${airport}/runways`);
		const runwayDataJson: FaaRunwayResponse = await runwayData.json();
		return runwayDataJson;
	}
	// async function handleAirportChange() {
	// 	if (selectedAirport) {
	// 		console.log(selectedAirport);
	// 		runwayData = await getAirportData(selectedAirport);
	// 	} else {
	// 		runwayData = null;
	// 	}
	// }

	onMount(async () => {
		runwayData = await getAirportData(airport);
	});
</script>

<!-- {#await data.props.airports}
	<p>Loading...</p>
{:then airports}
	<select
		class="select select-bordered w-full max-w-xs"
		bind:value={selectedAirport}
		on:change={handleAirportChange}
	>
		<option disabled selected>Select Aiport</option>
		{#each airports as airport}
			<option value={airport.ident}>{airport.ident}</option>
		{/each}
	</select>
{/await} -->

<LoadingCards />
<FixCard />
