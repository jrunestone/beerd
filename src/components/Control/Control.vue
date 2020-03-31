<template>
    <div class="control" :class="{ active: active }">
        <control-menu />

        <a href="" @click.prevent="toggleActive" @blur="activate(false)">
            <slot></slot>
        </a>
    </div>
</template>

<script src="./Control.ts"></script>
<style src="./Control.css" scoped></style>