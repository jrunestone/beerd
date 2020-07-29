<template>
    <div>
        <auth-modal />
        <button v-if="isAuthenticated()" @click="startAuthUntappd">Auth with Untappd</button>
        <p v-if="token">Untappd token to put in UNTAPPD_ACCESS_TOKEN env var: {{ token }}</p>
        <button v-if="isAuthenticated()" @click="startSync">Sync</button>
    </div>
</template>

<script src="./Auth.ts"></script>