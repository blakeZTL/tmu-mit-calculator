<script lang="ts">
	import type { FaaRunwayResponse } from '$lib/apiTypes';
	import type { ScaleLinear } from 'd3-scale';
	import { createAirportDiagramScales } from '$lib/utils/aiportDiagramUtils';

	export let width = 400;
	export let height = 400;
	export let margin = { top: 10, right: 10, bottom: 10, left: 10 };
	let xScale: ScaleLinear<number, number>;
	let yScale: ScaleLinear<number, number>;
	export let runwayData: FaaRunwayResponse | null = null;

	$: {
		if (runwayData) {
			({ xScale, yScale } = createAirportDiagramScales(runwayData, margin, width, height));
		}
	}
</script>

<svg {width} {height}>
	{#if runwayData}
		{#each runwayData.features as feature}
			{#each feature.geometry.rings as ring}
				<!-- Create a polygon for each ring -->
				<polygon
					points={ring.map((point) => `${xScale(point[0])},${yScale(point[1])}`).join(' ')}
					fill="white"
					opacity="0.5"
				/>
			{/each}
		{/each}
	{/if}
</svg>
