import Beer from '@src/models/Beer';
import BeerStyle from '@src/models/BeerStyle';
import BeerSortMode from '@src/models/BeerSortMode';

export interface State {
    allBeers: Beer[];
    currentStyleFilter: BeerStyle|null;
    currentSortMode: BeerSortMode|null;
};