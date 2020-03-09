import Vue from 'vue';
import Vuex from 'vuex';

import { State } from './types';
import { Beer } from '@src/database/types';

Vue.use(Vuex);

export default new Vuex.Store({
    state: <State>{
        beers: []
    },

    getters: {

    },

    mutations: {
        setBeers(state, beers: Beer[]) {
            state.beers = { ...beers };
        }
    },

    actions: {
        async fetchBeers(context) {
            const response = await fetch('/.netlify/functions/beers');
            const beers = await response.json();
            context.commit('setBeers', beers);
        }
    },

    modules: {

    }
});