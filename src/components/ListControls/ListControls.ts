import { Component, Vue } from 'vue-property-decorator';
import Control from '@/components/Control/Control.vue';
import BeerIcon from 'vue-material-design-icons/GlassMugVariant.vue';
import SortIcon from 'vue-material-design-icons/Sort.vue';

@Component({
    components: {
        Control,
        BeerIcon,
        SortIcon
    }
})
export default class ListControls extends Vue {

};