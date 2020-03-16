import { Beer as BeerBase, Brewer, Ratings } from '@/database/types';
import faunadb from 'faunadb';
import FaunaDate = faunadb.values.FaunaDate;

export class Beer implements BeerBase {
    id!: number;
    name!: string;
    style!: string;
    abv: number = 0;
    brewer!: Brewer;
    ratings!: Ratings;
    retailPrice: number | undefined;
    timesHad: number = 0;
    imageUrl: string | undefined;
    firstHad!: FaunaDate;
    lastHad!: FaunaDate;
    created!: FaunaDate;
    updated!: FaunaDate;
};