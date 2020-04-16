import { Component, Vue } from 'vue-property-decorator';
import { BeerStyle } from '@/models/BeerStyle';
import GlobalIcon from 'vue-material-design-icons/Earth.vue';

@Component({
    components: {
        GlobalIcon
    }
})
export default class StyleControlMenu extends Vue {
    get styles(): BeerStyle[] {
        return this.$store.getters.styles;
    }

    changeStyleFilter(style: BeerStyle) {
        this.$store.dispatch('setStyleFilter', style);
    }
};