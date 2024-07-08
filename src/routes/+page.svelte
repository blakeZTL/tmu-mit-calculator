<script lang="ts">
	import type { FaaRunwayResponse } from '$lib/apiTypes';
	import AirportDiagram from '$lib/components/AirportDiagram.svelte';
	import FixCard from '$lib/components/FixCard.svelte';
	import { onMount } from 'svelte';

	export let data;

	let width = 100;
	let height = 100;
	let margin = { top: 10, right: 10, bottom: 10, left: 10 };
	let runwayData: FaaRunwayResponse | null = null;
	let airport = 'atl';
	let fixes = [
		{
			fixName: 'FIX1',
			speed: false,
			selectedMIT: 5,
			holding: false,
			tbfm: false,
			placement: 5
		},
		{
			fixName: 'FIX2',
			speed: false,
			selectedMIT: 5,
			holding: false,
			tbfm: false,
			placement: 2
		},
		{
			fixName: 'FIX3',
			speed: false,
			selectedMIT: 5,
			holding: false,
			tbfm: false,
			placement: 3
		},
		{
			fixName: 'FIX4',
			speed: false,
			selectedMIT: 5,
			holding: false,
			tbfm: false,
			placement: 8
		},
		{
			fixName: 'FIX5',
			speed: false,
			selectedMIT: 5,
			holding: false,
			tbfm: false,
			placement: 11
		},
		{
			fixName: 'FIX6',
			speed: false,
			selectedMIT: 5,
			holding: false,
			tbfm: false,
			placement: 10
		}
	];

	async function getAirportData(airport: string) {
		const runwayData = await fetch(`/api/airport/${airport}/runways`);
		const runwayDataJson: FaaRunwayResponse = await runwayData.json();
		return runwayDataJson;
	}

	onMount(async () => {
		runwayData = await getAirportData(airport);
	});
</script>

<div
	class="grid grid-flow-dense grid-cols-4 grid-rows-3 gap-2 justify-items-center items-center m-3"
>
	{#each Array.from({ length: 5 }, (_, i) => i + 1) as item}
		{#if fixes.find((fix) => fix.placement === item)}
			<FixCard fixName={fixes.find((fix) => fix.placement === item)?.fixName} />
		{:else}
			<div id={`card-${item}`}></div>
		{/if}
	{/each}
	<div class="col-span-2 row-span-1 flex items-center">
		<div class="card">
			<div class="card-body items-center text-center">
				<h2 class="card-title">{airport.toUpperCase()}</h2>
				<AirportDiagram {height} {width} {margin} {runwayData} />
			</div>
		</div>
	</div>
	{#each Array.from({ length: 5 }, (_, i) => i + 1) as item}
		{#if fixes.find((fix) => fix.placement === item + 7)}
			<FixCard fixName={fixes.find((fix) => fix.placement === item + 7)?.fixName} />
		{:else}
			<div id={`card-${item + 7}`}></div>
		{/if}
	{/each}
</div>
