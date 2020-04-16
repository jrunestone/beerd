import { Component, Prop, Vue } from 'vue-property-decorator';
import { Beer } from '@/models/Beer';
import BeerCard from '@/components/BeerCard/BeerCard.vue';

@Component({
    components: {
        BeerCard
    }
})
export default class BeerList extends Vue {
    get beers(): Beer[] {
        return this.$store.getters.beers;
    }

    created() {
        this.$store.dispatch('fetchBeers');
    }
};