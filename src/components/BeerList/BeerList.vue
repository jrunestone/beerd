<template>
    <div>
        <div v-for="beer in beers" :key="beer.id">
            {{ beer.name }}
        </div>
    </div>
</template>

<script src="./BeerList.ts"></script>
<style src="./BeerList.css" scoped></style>