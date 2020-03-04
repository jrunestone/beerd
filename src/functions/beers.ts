import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda';
import faunadb from 'faunadb';

const q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

export async function handler(event: APIGatewayEvent, context: Context) {
    // console.log('event', event);
    // console.log('context', context);

    console.log(process.env.FAUNADB_SERVER_SECRET2, process.env.NODE_ENV);

    return {
        statusCode: 200,
        body: process.env.FAUNADB_SERVER_SECRET1 + ",,,,,,,,,,,,," + process.env.FAUNADB_SERVER_SECRET2
    }

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