import { Component, Vue } from 'vue-property-decorator';
import ListControls from '@/components/ListControls/ListControls.vue';
import BeerList from '@/components/BeerList/BeerList.vue';

@Component({
    components: {
        ListControls,
        BeerList
    }
})
export default class Home extends Vue {

}