import { Component, Prop, Vue } from 'vue-property-decorator';
import { Beer } from '@/database/types';

@Component
export default class BeerList extends Vue {
    get beers(): Beer[] {
        return this.$store.state.beers;
    }

    created() {
        this.$store.dispatch('fetchBeers');
    }
};