import Vue from 'vue';
import Vuex from 'vuex';

import { State } from './types';
import { Beer as BeerBase } from '@/database/types';
import { Beer } from '@/models/Beer';
import { BeerStyle } from '@/models/BeerStyle';

Vue.use(Vuex);

export default new Vuex.Store({
    state: <State>{
        allBeers: [],
        currentStyleFilter: null,
        currentSortMode: null
    },

    getters: {
        beers(state): Beer[] {
            let beers = state.allBeers;

            if (state.currentStyleFilter !== null) {
                beers = beers.filter(beer => beer.styleObj.name === state.currentStyleFilter?.name);
            }

            return beers;
        },

        styles(state) {
            let uniqueStyles: BeerStyle[] = [];
            const styles = state.allBeers.map(beer => beer.styleObj);

            styles.forEach(style => {
                if (uniqueStyles.findIndex(obj => obj.name === style.name) === -1) {
                    uniqueStyles.push(style);
                }
            });

            return uniqueStyles;
        }
    },

    mutations: {
        setBeers(state, beers: BeerBase[]) {
            state.allBeers = beers.map(obj => Object.assign(new Beer(), obj));
        },

        setStyleFilter(state, style: BeerStyle) {
            state.currentStyleFilter = style;
        }
    },

    actions: {
        async fetchBeers(context) {
            const response = await fetch('/.netlify/functions/beers');
            const beers = await response.json();
            context.commit('setBeers', beers);
        },

        async setStyleFilter(context, style: BeerStyle) {
            context.commit('setStyleFilter', style);
        }
    },

    modules: {

    }
});