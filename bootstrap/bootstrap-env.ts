import mapEnvVars from 'map-env-vars';

const mappedEnv = mapEnvVars({
    envConfig: {
        'development': '_DEV'
    },

    varLookups: {
        FAUNADB_SERVER_SECRET: 'FAUNADB_SERVER_SECRET{ENV}'
    }
});

const existingEnv = process.env;

process.env = { ...existingEnv, ...mappedEnv };