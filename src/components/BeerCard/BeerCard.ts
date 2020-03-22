import { Component, Prop, Vue } from 'vue-property-decorator';
import ScoreIcon from 'vue-material-design-icons/Medal.vue';
import BeerIcon from 'vue-material-design-icons/GlassMug.vue';
import UserIcon from 'vue-material-design-icons/AccountCircle.vue';
import GlobalIcon from 'vue-material-design-icons/Earth.vue';
import { Beer } from '@/models/Beer';

@Component({
    components: {
        ScoreIcon,
        BeerIcon,
        UserIcon,
        GlobalIcon
    }
})
export default class BeerCard extends Vue {
    @Prop()
    index!: number;

    @Prop()
    beer!: Beer;
};
