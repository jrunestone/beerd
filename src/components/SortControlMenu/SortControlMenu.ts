import { Component, Vue } from 'vue-property-decorator';
import { BeerSortMode } from '@/models/BeerSortMode';
import GlobalIcon from 'vue-material-design-icons/Earth.vue';

@Component({
    components: {
        GlobalIcon
    }
})
export default class SortControlMenu extends Vue {
    get sortModes(): BeerSortMode[] {
        return this.$store.getters.sortModes;
    }

    changeSortMode(sortMode: BeerSortMode) {
        this.$store.dispatch('setSortMode', sortMode);
    }
};