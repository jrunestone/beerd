[![Netlify Status](https://api.netlify.com/api/v1/badges/318809e3-f9af-4a74-b4da-0eb61adf325e/deploy-status)](https://app.netlify.com/sites/beerd/deploys)

Create collection+indexes and then import schema and shit with bootstrap db for dev..


DEVELOPING NOTES
    Create Untappd app
    Create netlify site
    Enable branch deploys in netlify
    Enable Functions in netlify
    Enable Identity in netlify
    Install `netlify-cli` globally
    Install `fauna-shell` globally
    Run `netlify link` to link the site
    Run `netlify addons:create fauna`
    Run `netlify addons:auth fauna` to auth and create prod database and store secret keys
    Create a new database in faunadb for dev purposes and add a key
    Add a new environment variable in netlify called `FAUNADB_SERVER_SECRET_development` with the key to a dev database
    Add a new environment variable in netlify called `UNTAPPD_CLIENT_ID` with the untappd api client id
    Add a new environment variable in netlify called `UNTAPPD_CLIENT_SECRET` with the untappd api client secret
    Add a new environment variable in netlify called `SERVICE_ACCESS_TOKEN` with a randomly generated password (for Automate.io integration)
    Go to faunadb and import the schema
    Run `fauna eval --secret=<your db secret key> --file=./bootstrap/bootstrap-db.fql` to create collection and indexes
    Run `npm run build:bootstrap` to build bootstrap scripts
    Run `npm run bootstrap:db` to create dummy data in dev database (need to terminate manually)
    Run `netlify dev` to start vue dev server and netlify proxies for functions with watch etc
    Create a netlify identity via invite to be able to authenticate
    Go to Automate.io and create a bot that will call the `sync` url on a regular basis, with the header `access-token` value of the created `SERVICE_ACCESS_TOKEN`

    Run `npm run build` to build production files to `./dist`

    To access environment-specific variables in process.env import `import 'bootstrap/bootstrap-env';` first which will map variables to the current environment via XXX_development pattern
    During pre-build a `.env` file for local env vars will be generated with NODE_ENV=development for `netlify dev` to work in development mode, this file is gitignored
    The database connection is made implicit via the `FAUNADB_SERVER_SECRET` environment variable (stored privately on netlify and on the database on fauna)
    The files in the bootstrap folder are compiled with a typescript binary that may be newer than the one bundled in vue and netlify which may need different syntax

    Master deploys to production environment in production mode
    Develop deploys to branch environment in development mode
    Feature branches deploy to branch environment in development mode
    Pull requests into master deploy to deploy-preview in production mode

SYNC BEERS FROM UNTAPPD INTO FAUNA
    In the live environment go to `/auth` to authorize the Untappd app and get an access token (or in dev, just make sure the redirect url in the api settings is pointing to localhost)
    Take the access token and put it in an environment variable called `UNTAPPD_ACCESS_TOKEN` to be able to run the sync script
    Go to `/.netlify/functions/sync` to start a beer sync job
    ?? This job is called [every night] by an external scheduling service (Zapier)

ENV VARIABLES
    FAUNADB_SERVER_SECRET
    FAUNADB_SERVER_SECRET_development
    UNTAPPD_CLIENT_ID
    UNTAPPD_CLIENT_SECRET
    UNTAPPD_ACCESS_TOKEN

PURPOSE
    An app to review my checked in beers on untappd
    Purpose to find old beers to drink again based on mood and rating

TODO
    Make netlify widget unclosable
    Imeplement sync function, make sure accessible externally via zapier or something
    Add loader spinner for fetching beers, syncing on auth page

    Extract components out of friends
    Add filter icons
    Make filters/sort fold in from left when swiping/hovering instead of btns
    Make correct style abbreviations
    Reset filter/sort
    Different style for filter/sort btn when active
    Show last time had, abv, retailprice..
    Include retail price in score calculation
    Check service worker working

FEATURES
    List beers with filter (style) and sorting (custom score, ratings, times had...etc) options
    View score and rating compared to global and friends
    Check is available at systembolaget right now
    Swipe left/right for different lists
        ?
    Stats
        Avg abv
        Beers drunk total
        Favorite hops/ibu
        Favorite brewer
        Favorite style (graph)
    Search box for search beer
    See popular beers that i havent drunk of same style available close to me (bars/systembolaget)
    Show all badges somehow

UX
    Click beer to show/hide details?
    Price
    Share beer
    Availability (bar/systembolaget)

EFFECTS
    Slide card to share?
    Click card to reveal details (inline)