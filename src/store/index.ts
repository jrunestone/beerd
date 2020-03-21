import Vue from 'vue';
import Vuex from 'vuex';

import { State } from './types';
import { Beer as BeerBase } from '@/database/types';
import { Beer } from '@/models/Beer';

Vue.use(Vuex);

export default new Vuex.Store({
    state: <State>{
        beers: []
    },

    getters: {
        // filters, sort..
    },

    mutations: {
        setBeers(state, beers: BeerBase[]) {
            state.beers = beers.map(obj => Object.assign(new Beer(), obj));
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