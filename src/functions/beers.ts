import { Context, APIGatewayEvent } from 'aws-lambda';
import { jsonResponse, unauthorizedResponse } from './helpers';
import AuthService from '../services/AuthService';
import DbService from '../services/DbService';

export async function handler(event: APIGatewayEvent, context: Context) {
    if (!AuthService.hasClientAuthHeaders(context)) {
        return unauthorizedResponse();
    }

    const dbService = new DbService();

    try {
        const beers = await dbService.getBeers();
        return jsonResponse(200, beers);
    } catch (err) {
        console.error(err);

        return jsonResponse(500, {
            error: err.message
        });
    }
}