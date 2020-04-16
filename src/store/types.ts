import { Beer } from '@src/models/Beer';
import { BeerStyle } from '@src/models/BeerStyle';

export interface State {
    allBeers: Beer[];
    currentStyleFilter: BeerStyle|null;
    currentSortMode: string|null;
};