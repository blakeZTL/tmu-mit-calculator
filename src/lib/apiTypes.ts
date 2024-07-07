export type FaaAiportResponse = {
	features: [
		{
			attributes: {
				GLOBAL_ID: string;
				IDENT: string;
				NAME: string;
				ICAO_ID: string;
				LATITUDE: string;
				LONGITUDE: string;
				ELEVATION: number;
			};
		}
	];
};

export type FaaRunwayResponse = {
	features:
		| [
				{
					attributes: {
						AIRPORT_ID: string;
						DESIGNATOR: string;
						LENGTH: number;
						WIDTH: number;
						DIM_UOM: string;
						Shape__Area: number;
						Shape__Length: number;
					};
					geometry: {
						rings: number[][][];
					};
				}
		  ]
		| [];
};
