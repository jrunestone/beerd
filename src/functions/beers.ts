import 'bootstrap/bootstrap-env';
import { Context, APIGatewayEvent } from 'aws-lambda';
import faunadb from 'faunadb';
import { QueryIndexResponse, BeerDocument } from '../database/types';

const q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

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

export async function handler(event: APIGatewayEvent, context: Context) {
    try {
        const itemQueries = await getItemQueries();
        const beers = await getBeerItems(itemQueries);

        return {
            statusCode: 200,
            body: JSON.stringify(beers)
        };
    } catch (err) {
        console.error(err);

        return {
            statusCode: 500,
            body: JSON.stringify(err.message)
        };
    }
}
