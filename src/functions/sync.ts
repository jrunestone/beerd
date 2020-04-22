import { Context, APIGatewayEvent } from 'aws-lambda';
import { jsonResponse } from './helpers';

const apiToken: string = process.env.UNTAPPD_ACCESS_TOKEN;

export async function handler(event: APIGatewayEvent, context: Context) {
    if (!apiToken) {
        return jsonResponse(500, {
            error: 'Missing Untappd API access token'
        });
    }

    try {
        // fetch beers from untappd
        // insert or update to faunadb

        const result = {
            'new': 0,
            'updated': 1
        };

        return jsonResponse(200, result);
    } catch (err) {
        console.error(err);

        return jsonResponse(500, {
            error: err.message
        });
    }
}