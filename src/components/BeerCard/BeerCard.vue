<template>
    <div class="beer-card" :data-raw="beerData()">
        <img :src="beer.imageUrl" :alt="beer.name" />

        <div class="card-content">
            <div class="card-left-col">
                <div class="card-content-main">
                    <h2 class="line-clamp"><a :href="beer.url">{{ beer.name }}</a></h2>
                    <small :title="beer.styleObj.name">{{ beer.styleObj.abbrName }}</small>
                </div>

                <div class="ratings">
                    <small class="icon"><user-icon />{{ beer.ratings.myRating }}</small>
                    <small class="icon"><global-icon />{{ beer.averageGlobalRating }}</small>
                </div>
            </div>

            <div class="card-right-col">
                <small class="score"><score-icon />{{ beer.score }}</small>
                <small class="icon"><beer-icon />{{ beer.timesHad }}</small>
                <div class="friends">
                    <div style="right: 0; z-index: 1; background: #fff;"></div>
                    <div style="right: 5px; z-index: 2; background: #000;"></div>
                    <div style="right: 10px; z-index: 3; background: #555;"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./BeerCard.ts"></script>
<style src="./BeerCard.css" scoped></style>