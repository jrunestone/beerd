import { Context, APIGatewayEvent } from 'aws-lambda';

export async function handler(event: APIGatewayEvent, context: Context) {
    try {
        // fetch beers from untappd
        // insert or update to faunadb

        const result = {
            'new': 0,
            'updated': 1
        };

        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (err) {
        console.error(err);

        return {
            statusCode: 500,
            body: JSON.stringify(err.message)
        };
    }
}