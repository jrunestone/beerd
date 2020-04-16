<template>
    <ul>
        <li v-for="(style, index) in styles" :key="index"><a href="#" @mousedown="changeStyleFilter(style)"><global-icon />{{ style.abbrName }}</a></li>
    </ul>
</template>

<script src="./StyleControlMenu.ts"></script>