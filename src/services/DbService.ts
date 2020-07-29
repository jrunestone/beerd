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

    async storeBeers(beers: Beer[]) {
        let inserts = beers.filter(beer => beer.fref === null);
        let updates = beers.filter(beer => beer.fref !== null);

        console.log('inserts', inserts.length);
        console.log('updates', updates.length);

        let insertOp = this.client.query(
            q.Map(
                inserts,
                q.Lambda(
                    'obj',
                    q.Create(
                        q.Collection('beers'),
                        { data: q.Var('obj') }
                    )
                )
            )
        );

        let updateOp = this.client.query(
            q.Map(
                updates,
                q.Lambda(
                    'obj',
                    q.Update(
                        q.Ref(q.Collection('beers'), q.Select(['fref'], q.Var('obj'))),
                        { data: q.Var('obj') }
                    )
                )
            )
        );

        return Promise.all([insertOp, updateOp]);
    }

    private async getItemQueries() {
        const indexRefResponse = <QueryIndexResponse>await this.client.query(
            q.Paginate(
                q.Match(
                    q.Index('beersSortedByScore')
                ),
                { size: 100000 }
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
            .map(d => {
                d.data.fref = d.ref.id;
                return d.data;
            });

        return beers;
    }
}