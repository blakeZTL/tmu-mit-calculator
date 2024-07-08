import type { PageLoad } from './$types';
import type { FaaAiportResponse } from '$lib/apiTypes';

export const load: PageLoad = async ({ fetch }) => {
	const getAirportData = async () => {
		const url =
			'https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/US_Airport/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
		const response = await fetch(url);
		const airportData: FaaAiportResponse = await response.json();
		const airports = airportData.features.map((airport) => {
			return {
				id: airport.attributes.GLOBAL_ID,
				ident: airport.attributes.IDENT
			};
		});
		return airports;
	};
	return {
		props: {
			airports: getAirportData()
		}
	};
};
