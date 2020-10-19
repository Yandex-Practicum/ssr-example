import {Empty} from 'utils';

export interface RequestOptions {
    query: string;
    locations?: {
        country: Empty<string>;
    }[];
}

export interface Response {
    suggestions: {
        value: string;
        unrestricted_value: string;
        data: {
            city: string;
            country: string;
            country_iso_code: string;
            geo_lat: number;
            geo_lon: number;
            region_type_full: string;
        };
    }[];
}

export interface SuggestItem {
    value: string;
    label: string;
}
export type Suggests = SuggestItem[];

export type DataMapper = (data: Response['suggestions']) => Suggests;
