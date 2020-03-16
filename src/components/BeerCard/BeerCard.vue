<template>
    <div class="beer-card" :style="{ '--index': (parseInt(index) + 1) }">
        <div class="beer-card-small-meta">
            <small class="beer-card-small-meta-right">{{ beer.score }}</small>
            <small>{{ beer.style }}</small>
        </div>

        <h2>{{ beer.name }}</h2>
        Had {{ beer.timesHad }} times

        <!--  more: xxx -->
    </div>
</template>

<script src="./BeerCard.ts"></script>
<style src="./BeerCard.css" scoped></style>