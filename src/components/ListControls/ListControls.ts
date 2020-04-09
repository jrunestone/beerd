import { Component, Vue } from 'vue-property-decorator';
import Control from '@/components/Control/Control.vue';
import ControlMenu from '@/components/ControlMenu/ControlMenu.vue';
import StyleControlMenu from '@/components/StyleControlMenu/StyleControlMenu.vue';
import BeerIcon from 'vue-material-design-icons/GlassMugVariant.vue';
import SortIcon from 'vue-material-design-icons/Sort.vue';

@Component({
    components: {
        Control,
        ControlMenu,
        StyleControlMenu,
        BeerIcon,
        SortIcon
    }
})
export default class ListControls extends Vue {

};