import { Beer as BeerBase, Brewer, Ratings } from '@/database/types';
import faunadb from 'faunadb';
import FaunaDate = faunadb.values.FaunaDate;
import BeerStyle from './BeerStyle';

export default class Beer implements BeerBase {
    [index: string]: any;

    fref!: string;
    id!: number;
    name!: string;
    style!: string;
    abv: number = 0;
    brewer!: Brewer;
    ratings!: Ratings;
    retailPrice: number|undefined;
    score!: number;
    timesHad: number = 0;
    imageUrl: string|undefined;
    firstHad!: FaunaDate;
    lastHad!: FaunaDate;
    created!: FaunaDate;
    updated!: FaunaDate;

    get styleObj(): BeerStyle {
        return new BeerStyle(this.style);
    }

    get averageGlobalRating(): number {
        return Number((
            ((this.ratings.globalRating ?? 0) + (this.ratings.rateBeerRating ?? 0)) / 2)
                .toFixed(2)
        );
    }
}