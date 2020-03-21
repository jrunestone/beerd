<template>
    <div class="beer-card">
        <img :src="beer.imageUrl" :alt="beer.name" />

        <div class="card-content">
            <div class="card-left-col">
                <div class="card-content-main">
                    <h2 class="line-clamp">{{ beer.name }}</h2>
                    <small>{{ beer.styleAbbr }}</small>
                </div>

                <div class="ratings">
                    <small class="icon"><user-icon />{{ beer.ratings.myRating }}</small>
                    <small class="icon"><global-icon />{{ beer.averageGlobalRating }}</small>
                </div>
            </div>

            <div class="card-right-col">
                <small class="score"><score-icon />{{ beer.score }}</small>
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