import type { RequestHandler } from '@sveltejs/kit';
import type { FaaAiportResponse } from '$lib/apiTypes';

export const GET: RequestHandler = async (event) => {
	const airport = event.params.slug;
	if (!airport) {
		return new Response('You must supply an airport', { status: 404 });
	}
	const url = `https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/US_Airport/FeatureServer/0/query?where=IDENT%20%3D%20'${airport}'&outFields=*&outSR=4326&f=json`;
	const response = await event.fetch(url);
	const data: FaaAiportResponse = await response.json();
	if (!data.features) {
		console.error('No data found', data);
		return new Response('Not found', { status: 404 });
	}
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
