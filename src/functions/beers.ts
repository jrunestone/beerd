import 'bootstrap/bootstrap-env';
import { Context, APIGatewayEvent } from 'aws-lambda';
import faunadb from 'faunadb';

const q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

export async function handler(event: APIGatewayEvent, context: Context) {
    try {
        const response = await client.query(q.Paginate(q.Match(q.Index('beers'))));
        const data = response;

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err.message)
        };
    }
}