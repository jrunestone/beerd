import './bootstrap-env';
import { QueryIndexResponse, Beer } from '@src/database/types';
import faunadb from 'faunadb';
import FaunaDate = faunadb.values.FaunaDate;

// imports dummy data into database

const q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET_development!
});

const NUM_ROWS = 10;

async function bootstrap() {
    const hasData = await databaseHasData();

    if (hasData) {
        console.log('Database not empty, not doing anything');
        return;
    }

    await insertData(NUM_ROWS);

    console.log(`Inserted ${NUM_ROWS} rows`);
}

async function databaseHasData() {
    let hasData = false;

    try {
        const response = <QueryIndexResponse>await client.query(
            q.Paginate(
                q.Match(
                    q.Index('beers')
                )
            )
        );

        hasData = response.data.length > 0;
    } catch {

    }

    return hasData;
}

async function insertData(num: number) {
    let objs: Beer[] = [];

    for (let i = 0; i < num; i++) {
        objs.push({
            id: Math.floor(1 + Math.random() * 70000),
            name: [`Beer Name ${i + 1}`, `Beer With A Longer Name ${i + 1}`, `Beer With A Long And Convoluted Hipster Name ${i + 1}`][Math.floor(Math.random() * 3)],
            style: ['IPA - American', 'Pale Ale - American', 'Stout - Imperial / Double', 'Farmhouse Ale - Saison'][Math.floor(Math.random() * 4)],
            abv: parseFloat((Math.random() * 15).toFixed(1)),
            brewer: {
                id: Math.floor(1 + Math.random() * 70000),
                name: ['Stigbergets Bryggeri', 'Dugges Bryggeri', 'Omnipollo', 'Poppels Bryggeri'][Math.random() * 4]
            },
            ratings: {
                myRating: parseFloat((1 + Math.random() * 5).toFixed(2)),
                globalRating: parseFloat((1 + Math.random() * 5).toFixed(2)),
                friendsRating: parseFloat((1 + Math.random() * 5).toFixed(2)),
                rateBeerRating: parseFloat((1 + Math.random() * 5).toFixed(2))
            },
            score: parseFloat((1 + Math.random() * 5).toFixed(2)),
            retailPrice: parseFloat((1 + Math.random() * 100).toFixed(2)),
            timesHad: Math.floor(1 + Math.random() * 10),
            imageUrl: 'https://placekitten.com/200/300',
            firstHad: new FaunaDate(`${2015 + Math.floor(Math.random() * 5)}-${(1 + Math.floor(Math.random() * 12)).toString().padStart(2, '0')}-${(1 + Math.floor(Math.random() * 28)).toString().padStart(2, '0')}`),
            lastHad: new FaunaDate(`${2015 + Math.floor(Math.random() * 6)}-${(1 + Math.floor(Math.random() * 12)).toString().padStart(2, '0')}-${(1 + Math.floor(Math.random() * 28)).toString().padStart(2, '0')}`),
            created: new FaunaDate(`${2015 + Math.floor(Math.random() * 4)}-${(1 + Math.floor(Math.random() * 12)).toString().padStart(2, '0')}-${(1 + Math.floor(Math.random() * 28)).toString().padStart(2, '0')}`),
            updated: new FaunaDate(`${2015 + Math.floor(Math.random() * 6)}-${(1 + Math.floor(Math.random() * 12)).toString().padStart(2, '0')}-${(1 + Math.floor(Math.random() * 28)).toString().padStart(2, '0')}`)
        });
    }

    return client.query(
        q.Map(
            objs,
            q.Lambda(
                'obj',
                q.Create(
                    q.Collection('beers'),
                    { data: q.Var('obj') }
                )
            )
        )
    );
}

bootstrap()
    .then(() => console.log('Finished'))
    .catch(console.error);