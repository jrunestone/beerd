import fetch from 'node-fetch';
import { Context, APIGatewayEvent } from 'aws-lambda';
import { jsonResponse, unauthorizedResponse } from './helpers';
import faunadb from 'faunadb';
import { Beer } from '../database/types';
import AuthService from '../services/AuthService';
import DbService from '../services/DbService';

const apiClientId: string = process.env.UNTAPPD_CLIENT_ID;
const apiToken: string = process.env.UNTAPPD_ACCESS_TOKEN;
const dbService = new DbService();

interface UntappdBeerResponse {
    count: number;
    first_had: string;
    rating_score: number;
    recent_created_at: string;

    beer: {
        bid: number;
        beer_abv: number;
        beer_label: string;
        beer_name: string;
        beer_style: string;
        rating_score: number;
    };

    brewery: {
        brewery_id: number;
        brewery_name: string;
    };
}

export async function handler(event: APIGatewayEvent, context: Context) {
    if (!AuthService.hasClientAuthHeaders(context)) {
        return unauthorizedResponse();
    }

    if (!apiToken) {
        return jsonResponse(500, {
            error: 'Missing Untappd API access token'
        });
    }

    try {
        // fetch beers from untappd
        // get total count, and fetch beers until all are fetched until !pagination.next_url
        // foreach beer update friend's rating and global rating and score
        // todo: retail price, availability
        // get all beers from fauna and check against untappd what should be updated

        const existingBeers = await dbService.getBeers();
        const newBeers = await fetchAllUntappdBeers();

        // return jsonResponse(200, [existingBeers]);
        let beersToSend = newBeers
            .map(mapBeer)
            .map(beer => syncBeer(beer, existingBeers))
            .filter(beer => beer !== null);

        if (!beersToSend.length) {
            return jsonResponse(200, { message: 'Everything up to date' });
        }

        // send (upsert) beers to fauna
        let response = await dbService.storeBeers(beersToSend);

        return jsonResponse(200, response);
    } catch (err) {
        console.error(err);

        return jsonResponse(500, {
            message: err.message
        });
    }
}

async function fetchApiUrl(url: string) {
    return fetch(`${url}&access_token=${apiToken}`, {
        headers: {
            'User-Agent': `beerd (${apiClientId})`
        }
    });
}

async function fetchAllUntappdBeers(): Promise<UntappdBeerResponse[]> {
    let beers: UntappdBeerResponse[] = [];
    let nextBatchUrl: string = 'https://api.untappd.com/v4/user/beers?offset=0&limit=50';

    while (nextBatchUrl && nextBatchUrl.length) {
        const apiResponse = await fetchApiUrl(nextBatchUrl);
        const data = await apiResponse.json();

        beers = [...beers, ...data.response.beers.items];

        nextBatchUrl = data.response.pagination.next_url;
    }

    return beers;
}

function syncBeer(beer: Beer, existingBeers: Beer[]): Beer {
    const existingBeer = existingBeers.find(b => b.id === beer.id);

    if (!existingBeer) {
        return beer;
    }

    // check if existingBeer should be updated
    if (
        existingBeer.timesHad < beer.timesHad ||
        (existingBeer.ratings.friendsRating || null) !== (beer.ratings.friendsRating || null) ||
        (existingBeer.ratings.rateBeerRating || null) !== (beer.ratings.rateBeerRating || null) ||
        existingBeer.ratings.globalRating !== beer.ratings.globalRating
    ) {
        beer.fref = existingBeer.fref;
        beer.created = existingBeer.created;
        return beer;
    }

    return null;
}

function mapBeer(beer: UntappdBeerResponse) : Beer {
    // set score
    // map beer style to shortname
    // set global average score (untappd+ratebeer)
    const now: Date = new Date();

    return {
        fref: null,
        id: beer.beer.bid,
        name: beer.beer.beer_name,
        style: beer.beer.beer_style,
        abv: beer.beer.beer_abv,

        brewer: {
            id: beer.brewery.brewery_id,
            name: beer.brewery.brewery_name
        },

        ratings: {
            myRating: beer.rating_score,
            friendsRating: null, // TODO
            globalRating: beer.beer.rating_score,
            rateBeerRating: null // TODO
        },

        score: 0,
        retailPrice: null, // TODO
        timesHad: beer.count,
        imageUrl: beer.beer.beer_label,
        firstHad: new faunadb.values.FaunaDate(new Date(beer.first_had)),
        lastHad: new faunadb.values.FaunaDate(new Date(beer.recent_created_at)),
        created: new faunadb.values.FaunaDate(now),
        updated: new faunadb.values.FaunaDate(now)
    };
}