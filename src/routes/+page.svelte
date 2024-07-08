<script lang="ts">
	import type { FaaRunwayResponse } from '$lib/apiTypes';
	import AirportDiagram from '$lib/components/AirportDiagram.svelte';
	import { onMount } from 'svelte';

	export let data;

	let width = 400;
	let height = 400;
	let margin = { top: 10, right: 10, bottom: 10, left: 10 };
	let runwayData: FaaRunwayResponse | null = null;
	let airport = 'atl';
	let selectedAirport = '';

	// Function to fetch airport data
	async function getAirportData(airport: string) {
		const runwayData = await fetch(`/api/airport/${airport}/runways`);
		const runwayDataJson: FaaRunwayResponse = await runwayData.json();
		return runwayDataJson;
	}
	async function handleAirportChange() {
		if (selectedAirport) {
			console.log(selectedAirport);
			runwayData = await getAirportData(selectedAirport);
		} else {
			runwayData = null;
		}
	}
</script>

{#await data.props.airports}
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
{/await}
{#if runwayData}
	<div id={`${airport}-diagram`}>
		<AirportDiagram {width} {height} {margin} {runwayData} />
	</div>
{/if}
