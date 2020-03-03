import { faunadb, query as q } from 'faunadb';

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = async (event, context) => {
    console.log('process.env', process.env);
    console.log('event', event);
    console.log('context', context);

    try {
        const response = await client.query(q.Paginate(q.Match(q.Index('beers'))));
    } catch (err) {
        return {
            stausCode: 500,
            body: JSON.stringify(err)
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
}