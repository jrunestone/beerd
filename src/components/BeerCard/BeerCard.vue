<template>
    <div class="beer-card">
        <img :src="beer.imageUrl" :alt="beer.name" />
        <small class="score">{{ beer.score }}</small>
        <h2 class="line-clamp">{{ beer.name }}</h2>
        <small>{{ beer.style }}</small>
        <div class="meta-bottom">
            <small>{{ beer.ratings.myRating }}</small>
        </div>
    </div>
</template>

<script src="./BeerCard.ts"></script>
<style src="./BeerCard.css" scoped></style>