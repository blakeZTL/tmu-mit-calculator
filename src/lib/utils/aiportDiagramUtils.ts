import type { FaaRunwayResponse } from '$lib/apiTypes';
import type { ScaleLinear } from 'd3-scale';
import { scaleLinear } from 'd3-scale';

type Margin = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

export function createAirportDiagramScales(
	data: FaaRunwayResponse,
	margin: Margin,
	width: number,
	height: number
): {
	xScale: ScaleLinear<number, number>;
	yScale: ScaleLinear<number, number>;
} {
	const points = data.features.flatMap((feature) => feature.geometry.rings[0]);
	const lats = points.map((d) => d[1]);
	const longs = points.map((d) => d[0]);
	const xMin = Math.min(...longs);
	const xMax = Math.max(...longs);
	const yMin = Math.min(...lats);
	const yMax = Math.max(...lats);
	return {
		xScale: scaleLinear()
			.domain([xMin, xMax])
			.range([margin.left, width - margin.right]),
		yScale: scaleLinear()
			.domain([yMin, yMax])
			.range([height - margin.bottom, margin.top])
	};
}
