[![Netlify Status](https://api.netlify.com/api/v1/badges/318809e3-f9af-4a74-b4da-0eb61adf325e/deploy-status)](https://app.netlify.com/sites/beerd/deploys)

TODO ENV
Database bootstrap script
Make sure debugging works with vue and functions (build/serve in dev mode)

CONFIG NOTES
    Run `npm run build` to build files to `./dist` (web and functions)
    Run `netlify dev` to start vue dev server and netlify proxies for functions etc

    The database connection is made implicit via the `FAUNADB_SERVER_SECRET` environment variable (stored privately on netlify and on the database on fauna)

IMPL
scheduled cloud function that fetches untappd beers (possibly on untappd checkin trigger)
fetches info about beers from ratebeer and beeradv
updates database


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

MAIN VIEW
    header with control options (big buttons that fold out options)
        source (my beers, friend's beers that i havent drunk)
        style (folds out predefined styles: all, ipa, dipa, dstout, pstout)
        sort (my rating, other's untappd rating, ratebeer rating, beeradv rating, friend's rating, times drunk by me, custom score)
        random beer of same style from untapped that i havent drunk (available in sweden)

    list of beers with infinite scroll
        AT A GLANCE
            name
            style
            my untappd rating
            times drunk/custom score?
            last drunk

        CLICK
            button to "just drank it again, would drink again"
            other's untappd rating
            friend's untappd rating
            ratebeer rating
            beeradv rating
            times drunk
            custom score
            where can i buy it now (systembolaget stock, predefined, closest)
            price

FIRST STEPS
    list of my untappd beers sorted by rating
    header with style options

mutation CreateFirstBeer {
  createBeer(data: {
    id: 3475336
    name: "Oceans Apart"
    style: "IPA - American"
    abv: 7.0
    brewer: {
      id: 0
      name: "Stigbergets Bryggeri"
    }
    ratings: {
      myRating: 3.75
      globalRating: 3.50
    }
    retailPrice: 38.0
    timesHad: 1
    firstHad: "2020-01-01"
    lastHad: "2020-01-01"
    created: "2020-03-01"
    updated: "2020-03-01"
  }) {
    id
    name
  }
}