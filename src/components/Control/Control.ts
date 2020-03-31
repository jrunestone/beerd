import { Component, Vue } from 'vue-property-decorator';
import ControlMenu from '@/components/ControlMenu/ControlMenu.vue';

@Component({
    components: {
        ControlMenu
    }
})
export default class Control extends Vue {
    active: boolean = false;

    toggleActive() {
        this.active = !this.active;
    }

    activate(active: boolean) {
        this.active = active;
    }
};