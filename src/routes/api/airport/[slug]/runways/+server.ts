import type { RequestHandler } from '@sveltejs/kit';
import type { FaaRunwayResponse, FaaAiportResponse } from '$lib/apiTypes';

export const GET: RequestHandler = async (event) => {
	const airportId = event.params.slug;
	if (!airportId) {
		return new Response('You must supply an airport id', { status: 404 });
	}
	let response = await event.fetch('../../../api/airport/' + airportId);
	const aiportData: FaaAiportResponse = await response.json();
	if (!response.ok) {
		return new Response('Error getting airport data', { status: 500 });
	}
	console.debug('aiportData', aiportData);
	const { GLOBAL_ID } = aiportData.features[0].attributes;
	console.debug('GLOBAL_ID', GLOBAL_ID);

	const url = `https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/Runways/FeatureServer/0/query?where=AIRPORT_ID%20%3D%20'${GLOBAL_ID}'&outFields=*&outSR=4326&f=json`;
	response = await fetch(url);
	const runwayData: FaaRunwayResponse = await response.json();
	if (!runwayData.features) {
		console.error('No data found', runwayData);
		return new Response('Not found', { status: 404 });
	}

	return new Response(JSON.stringify(runwayData), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
