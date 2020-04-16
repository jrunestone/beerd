<template>
    <div class="home">
        <a v-if="commitRef !== null" class="development-notice" :href="commitUrl">#{{ commitRef }}</a>
        <list-controls />
        <beer-list />
    </div>
</template>

<script src="./Home.ts"></script>
<style src="./Home.css" scoped></style>