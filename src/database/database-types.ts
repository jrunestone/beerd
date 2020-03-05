import faunadb from 'faunadb';
import FaunaDate = faunadb.values.FaunaDate;

export interface Response {
    data: Document[];
}

export interface Document {
    ref: Reference;
}

export interface Reference {
    id: string;
}

export interface Brewer {
    id: number;
    name: String;
}

export interface Ratings {
    myRating: number;
    globalRating: number;
    friendsRating: number;
    rateBeerRating: number;
}

export interface Beer {
    id: number;
    name: string;
    style: string;
    abv: number;
    brewer: Brewer;
    ratings: Ratings;
    retailPrice: number;
    timesHad: number;
    imageUrl: string;
    firstHad: FaunaDate;
    lastHad: FaunaDate;
    created: FaunaDate;
    updated: FaunaDate;
}