import 'bootstrap/bootstrap-env';
import { Context, APIGatewayEvent } from 'aws-lambda';
import faunadb from 'faunadb';
import { QueryIndexResponse, BeerDocument } from '../database/types';
import { jsonResponse, unauthorizedResponse } from './helpers';
import AuthService from '../services/AuthService';

const q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

export async function handler(event: APIGatewayEvent, context: Context) {
    if (!AuthService.hasClientAuthHeaders(context)) {
        return unauthorizedResponse();
    }

    try {
        const itemQueries = await getItemQueries();
        const beers = await getBeerItems(itemQueries);

        return jsonResponse(200, beers);
    } catch (err) {
        console.error(err);

        return jsonResponse(500, {
            error: err.message
        });
    }
}

async function getItemQueries() {
    const indexRefResponse = <QueryIndexResponse>await client.query(
        q.Paginate(
            q.Match(
                q.Index('beersSortedByScore')
            )
        )
    );

    // [score, ref]
    const itemQueries = indexRefResponse.data
        .map(d => q.Get(d[1]));

    return itemQueries;
}

async function getBeerItems(itemQueries: faunadb.Expr[]) {
    const documentsResponse = <BeerDocument[]>await client.query(itemQueries);

    const beers = documentsResponse
        .map(d => d.data);

    return beers;
}