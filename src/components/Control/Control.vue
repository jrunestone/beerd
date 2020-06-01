<template>
    <div class="control" :class="{ active: active }">
        <slot name="menu"></slot>

        <a href="" @click.prevent="toggleActive" @blur="activate(false)">
            <slot name="icon"></slot>
        </a>
    </div>
</template>

<script src="./Control.ts"></script>
<style src="./Control.css" scoped></style>