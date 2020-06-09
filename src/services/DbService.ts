import 'bootstrap/bootstrap-env';
import faunadb from 'faunadb';
import { QueryIndexResponse, BeerDocument, Beer } from '../database/types';

const q = faunadb.query;

export default class DbService {
    client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET
    });

    async getBeers(): Promise<Beer[]> {
        const itemQueries = await this.getItemQueries();
        const beerItems = await this.getBeerItems(itemQueries);

        return beerItems;
    }

    private async getItemQueries() {
        const indexRefResponse = <QueryIndexResponse>await this.client.query(
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

    private async getBeerItems(itemQueries: faunadb.Expr[]) {
        const documentsResponse = <BeerDocument[]>await this.client.query(itemQueries);

        const beers = documentsResponse
            .map(d => d.data);

        return beers;
    }
}