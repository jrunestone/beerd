<template>
    <div>
        <auth-modal />
        <button v-if="isAuthenticated()" @click="startAuthUntappd">Auth with Untappd</button>
    </div>
</template>

<script src="./Auth.ts"></script>