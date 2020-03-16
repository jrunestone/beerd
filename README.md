[![Netlify Status](https://api.netlify.com/api/v1/badges/318809e3-f9af-4a74-b4da-0eb61adf325e/deploy-status)](https://app.netlify.com/sites/beerd/deploys)

Create collection+indexes and then import schema and shit with bootstrap db for dev..


DEVELOPING NOTES
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
    Run `fauna eval --secret=<your db secret key> --file=./bootstrap/bootstrap-db.fql` to create collection and indexes
    Go to faunadb and import the schema
    Run `npm run build:bootstrap` to build bootstrap scripts
    Run `npm run bootstrap:db` to create dummy data in dev database (need to terminate manually)
    Run `netlify dev` to start vue dev server and netlify proxies for functions with watch etc
    TODO: Zapier...untappd...ratebeer..manual beer sync...

    Run `npm run build` to build production files to `./dist`

    To access environment-specific variables in process.env import `import 'bootstrap/bootstrap-env';` first which will map variables to the current environment via XXX_development pattern
    During pre-build a `.env` file for local env vars will be generated with NODE_ENV=development for `netlify dev` to work in development mode, this file is gitignored
    The database connection is made implicit via the `FAUNADB_SERVER_SECRET` environment variable (stored privately on netlify and on the database on fauna)
    The files in the bootstrap folder are compiled with a typescript binary that may be newer than the one bundled in vue and netlify which may need different syntax

    Master deploys to production environment in production mode
    Develop deploys to branch environment in development mode
    Feature branches deploy to branch environment in development mode
    Pull requests into master deploy to deploy-preview in production mode

ENV VARIABLES
    FAUNADB_SERVER_SECRET
    FAUNADB_SERVER_SECRET_development

NOTES

An app to review my checked in beers on untappd
Purpose to find old beers to drink again based on mood and rating

Feature: at a glance view my top ranked beer/most drinked side by side with friends and ratebeer/beer adv/
Feature: easy to switch between predefined styles (ipa, dipa, dstout, pstout) (predefined filters)
Feature: easy to hit "just drank it again" - no score etc just one more time and possibly "would drink again yes/no"
Feature: custom score (rating + times drunk) + price?
Feature: stats (preferred style, how many litres, money spent etc)
Feature: integrate with systembolaget to see if this particular beer is available right now and where (predefined + search + closest)
Feature: view to see recent systembolaget releases by style
Feature: view friend's untapped checkins of same style that i havent tasted
Feature: see what hops i really like
Feature: see what breweries i really like

MAIN VIEW
    https://dribbble.com/shots/5690048-Social-Meet-Up-UI-Kit-Motion-Product-design

    header with control options (big buttons that fold out options on touch/hold)
        source (my beers, friend's beers that i havent drunk) <- slide this one left/right
        style (folds out predefined styles: all, ipa, dipa, dstout, pstout)
        sort (my/their rating, other's untappd rating, ratebeer rating, beeradv rating, friend's rating, times drunk by me, custom score)
        random beer of same style from untapped that i havent drunk (available in sweden)
        search
        custom score = rating + times had

    list of beers with infinite scroll
        AT A GLANCE
            name
            (style)
            my untappd rating
            times drunk/custom score?
            last drunk
            badge for "favorite" not manual but based on stats
            badges for friends who drank it (liked it?)

        CLICK (or drag down on card)
            button to "just drank it again, would drink again"
            other's untappd rating
            friend's untappd rating
            ratebeer rating
            beeradv rating
            times drunk
            custom score
            where can i buy it now (systembolaget stock, predefined, closest)
            price
            recommend to friend

        COOL
            slide header left/right for different source mode
            drag down on header to reveal more detailed filters?
            header disappears scrolling down, appears scrolling up
            drag down on beer instead of click
            slide either way for "just had it would drink again yes/no"
            search by taking photo on beer can (barcode and/or name)