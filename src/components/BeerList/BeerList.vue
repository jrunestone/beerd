<template>
    <div class="beer-list">
        <beer-card v-for="(beer, index) in beers" :key="beer.id" :beer="beer" :index="index" />
    </div>
</template>

<script src="./BeerList.ts"></script>
<style src="./BeerList.css" scoped></style>