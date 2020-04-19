<template>
    <ul>
        <li><a href="#" @mousedown="changeStyleFilter(null)"><global-icon />ALL</a></li>
        <li v-for="(style, index) in styles" :key="index"><a href="#" @mousedown="changeStyleFilter(style)"><global-icon />{{ style.abbrName }}</a></li>
    </ul>
</template>

<script src="./StyleControlMenu.ts"></script>