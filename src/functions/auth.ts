import 'bootstrap/bootstrap-env';
import { Context, APIGatewayEvent } from 'aws-lambda';
import { jsonResponse } from './helpers';

const clientId: string = process.env.UNTAPPD_CLIENT_ID;
const clientSecret: string = process.env.UNTAPPD_CLIENT_SECRET;
const redirectUrl: string = `${process.env.URL}/.netlify/functions/auth`;

export async function handler(event: APIGatewayEvent, context: Context) {
    const code = event.queryStringParameters.code;

    // step 1 authenticate
    if (!code) {
        const authenticateUrl = `https://untappd.com/oauth/authenticate/?client_id=${clientId}&response_type=code&redirect_url=${redirectUrl}`;

        return jsonResponse(200, {
            url: authenticateUrl
        });
    }

    // step 2 authorize
    const authorizeUrl = `https://untappd.com/oauth/authorize/?client_id=${clientId}&client_secret=${clientSecret}&response_type=code&code=${code}&redirect_url=${redirectUrl}`;
    const response = await fetch(authorizeUrl);
    const result = await response.json();

    return jsonResponse(200, {
        token: result.access_token
    });
}