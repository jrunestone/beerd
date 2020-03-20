<template>
    <div class="beer-list">
        <beer-card v-for="beer in beers" :key="beer.id" :beer="beer" />
    </div>
</template>

<script src="./BeerList.ts"></script>
<style src="./BeerList.css" scoped></style>