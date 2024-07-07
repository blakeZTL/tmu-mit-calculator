<script>
	import { render } from '@testing-library/svelte';
	import AirportDiagram from './AirportDiagram.svelte';

	describe('AirportDiagram', () => {
		it('renders without errors', () => {
			const { container } = render(AirportDiagram);
			expect(container).toBeInTheDocument();
		});

		it('renders the correct number of polygons', () => {
			const runwayData = {
				features: [
					{
						geometry: {
							rings: [
								[
									[0, 0],
									[0, 1],
									[1, 1],
									[1, 0]
								],
								[
									[2, 2],
									[2, 3],
									[3, 3],
									[3, 2]
								]
							]
						}
					}
				]
			};

			const { getAllByTestId } = render(AirportDiagram, { props: { runwayData } });
			const polygons = getAllByTestId('polygon');
			expect(polygons.length).toBe(2);
		});

		it('renders polygons with correct points', () => {
			const runwayData = {
				features: [
					{
						geometry: {
							rings: [
								[
									[0, 0],
									[0, 1],
									[1, 1],
									[1, 0]
								],
								[
									[2, 2],
									[2, 3],
									[3, 3],
									[3, 2]
								]
							]
						}
					}
				]
			};

			const { getAllByTestId } = render(AirportDiagram, { props: { runwayData } });
			const polygons = getAllByTestId('polygon');
			const points = polygons.map((polygon) => polygon.getAttribute('points'));

			expect(points).toEqual(['0,0 0,400 400,400 400,0', '800,800 800,1200 1200,1200 1200,800']);
		});
	});
</script>

<AirportDiagram data-testid="airport-diagram" />
