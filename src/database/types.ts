import faunadb from 'faunadb';
import Ref = faunadb.values.Ref;
import FaunaDate = faunadb.values.FaunaDate;

export interface QueryIndexResponse {
    data: Ref[];
}

export interface BeerDocument {
    data: Beer[];
}

export interface Brewer {
    id: number;
    name: String;
}

export interface Ratings {
    myRating: number;
    globalRating: number | undefined;
    friendsRating: number | undefined;
    rateBeerRating: number | undefined;
}

export interface Beer {
    id: number;
    name: string;
    style: string;
    abv: number | undefined;
    brewer: Brewer;
    ratings: Ratings;
    score: number;
    retailPrice: number | undefined;
    timesHad: number;
    imageUrl: string | undefined;
    firstHad: FaunaDate;
    lastHad: FaunaDate;
    created: FaunaDate;
    updated: FaunaDate;
}