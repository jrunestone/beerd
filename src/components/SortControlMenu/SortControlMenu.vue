<template>
    <ul>
        <li v-for="(sortMode, index) in sortModes" :key="index"><a href="#" @mousedown="changeSortMode(sortMode)"><global-icon />{{ sortMode.name }}</a></li>
    </ul>
</template>

<script src="./SortControlMenu.ts"></script>