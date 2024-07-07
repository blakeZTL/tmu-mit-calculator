import type { FaaRunwayResponse } from '$lib/apiTypes';
import { createAirportDiagramScales } from '$lib/utils/aiportDiagramUtils';
import { describe, it, expect } from 'vitest';

describe('createAirportDiagramScales', () => {
	const margin = { top: 10, right: 10, bottom: 10, left: 10 };
	const width = 500;
	const height = 500;
	const attributes = {
		AIRPORT_ID: 'string',
		DESIGNATOR: 'string',
		LENGTH: 1,
		WIDTH: 1,
		DIM_UOM: 'string',
		Shape__Area: 1,
		Shape__Length: 1
	};

	it('should return correct scales for a simple dataset', () => {
		const data: FaaRunwayResponse = {
			features: [
				{
					attributes,
					geometry: {
						rings: [
							[
								[0, 0],
								[1, 1]
							]
						]
					}
				}
			]
		};

		const { xScale, yScale } = createAirportDiagramScales(data, margin, width, height);

		expect(xScale.domain()).toEqual([0, 1]);
		expect(xScale.range()).toEqual([margin.left, width - margin.right]);
		expect(yScale.domain()).toEqual([0, 1]);
		expect(yScale.range()).toEqual([height - margin.bottom, margin.top]);
	});

	it('should handle empty data gracefully', () => {
		const data: FaaRunwayResponse = {
			features: []
		};

		const { xScale, yScale } = createAirportDiagramScales(data, margin, width, height);

		expect(xScale.domain()).toEqual([Infinity, -Infinity]);
		expect(xScale.range()).toEqual([margin.left, width - margin.right]);
		expect(yScale.domain()).toEqual([Infinity, -Infinity]);
		expect(yScale.range()).toEqual([height - margin.bottom, margin.top]);
	});

	it('should handle data with single point', () => {
		const data: FaaRunwayResponse = {
			features: [
				{
					attributes,
					geometry: {
						rings: [[[5, 5]]]
					}
				}
			]
		};

		const { xScale, yScale } = createAirportDiagramScales(data, margin, width, height);

		expect(xScale.domain()).toEqual([5, 5]);
		expect(xScale.range()).toEqual([margin.left, width - margin.right]);
		expect(yScale.domain()).toEqual([5, 5]);
		expect(yScale.range()).toEqual([height - margin.bottom, margin.top]);
	});

	it('should handle extreme values', () => {
		const data: FaaRunwayResponse = {
			features: [
				{
					attributes,
					geometry: {
						rings: [
							[
								[-1000, -1000],
								[1000, 1000]
							]
						]
					}
				}
			]
		};

		const { xScale, yScale } = createAirportDiagramScales(data, margin, width, height);

		expect(xScale.domain()).toEqual([-1000, 1000]);
		expect(xScale.range()).toEqual([margin.left, width - margin.right]);
		expect(yScale.domain()).toEqual([-1000, 1000]);
		expect(yScale.range()).toEqual([height - margin.bottom, margin.top]);
	});

	it('should apply margins correctly', () => {
		const data: FaaRunwayResponse = {
			features: [
				{
					attributes,
					geometry: {
						rings: [
							[
								[0, 0],
								[10, 10]
							]
						]
					}
				}
			]
		};

		const { xScale, yScale } = createAirportDiagramScales(data, margin, width, height);

		expect(xScale.domain()).toEqual([0, 10]);
		expect(xScale.range()).toEqual([margin.left, width - margin.right]);
		expect(yScale.domain()).toEqual([0, 10]);
		expect(yScale.range()).toEqual([height - margin.bottom, margin.top]);
	});
});
