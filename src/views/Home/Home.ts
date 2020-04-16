import { Component, Vue } from 'vue-property-decorator';
import ListControls from "@/components/ListControls/ListControls.vue";
import BeerList from "@/components/BeerList/BeerList.vue";

@Component({
    components: {
        ListControls,
        BeerList
    }
})
export default class Home extends Vue {
    commitRef: string | undefined = process.env.COMMIT_REF || null;

    get commitUrl() {
        if (process.env.COMMIT_REF && process.env.REPOSITORY_URL) {
            return `{process.env.REPOSITORY_URL}/commit/{process.env.COMMIT_REF}`;
        }

        return null;
    }
}