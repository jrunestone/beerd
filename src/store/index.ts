import Vue from 'vue';
import Vuex from 'vuex';

import { State } from './types';
import { Beer as BeerBase } from '@/database/types';
import { Beer } from '@/models/Beer';
import { BeerStyle } from '@/models/BeerStyle';
import { BeerSortMode } from '@/models/BeerSortMode';

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

            // filter
            if (state.currentStyleFilter !== null) {
                beers = beers.filter(beer => beer.styleObj.name === state.currentStyleFilter?.name);
            }

            // sort
            if (state.currentSortMode !== null) {
                beers = beers.sort((a: Beer, b: Beer) => {
                    const valA = state.currentSortMode?.sortProp(a);
                    const valB = state.currentSortMode?.sortProp(b);

                    if (valA == valB) {
                        return 0;
                    }

                    return (valA > valB ? -1 : 1);
                });
            }

            return beers;
        },

        styles(state): BeerStyle[] {
            let uniqueStyles: BeerStyle[] = [];
            const styles = state.allBeers.map(beer => beer.styleObj);

            styles.forEach(style => {
                if (uniqueStyles.findIndex(obj => obj.name === style.name) === -1) {
                    uniqueStyles.push(style);
                }
            });

            return uniqueStyles;
        },

        sortModes(state): BeerSortMode[] {
            return [
                new BeerSortMode('My Score', beer => beer.score),
                new BeerSortMode('My Rating', beer => beer.ratings.myRating),
                new BeerSortMode('Global Rating', beer => beer.averageGlobalRating)
            ];
        }
    },

    mutations: {
        setBeers(state, beers: BeerBase[]) {
            state.allBeers = beers.map(obj => Object.assign(new Beer(), obj));
        },

        setStyleFilter(state, style: BeerStyle) {
            state.currentStyleFilter = style;
        },

        setSortMode(state, sortMode: BeerSortMode) {
            state.currentSortMode = sortMode;
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
        },

        async setSortMode(context, sortMode: string) {
            context.commit('setSortMode', sortMode);
        }
    },

    modules: {

    }
});