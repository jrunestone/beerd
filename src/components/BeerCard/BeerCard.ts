import { Component, Prop, Vue } from 'vue-property-decorator';
import { Beer } from '@/models/Beer';

@Component
export default class BeerCard extends Vue {
    @Prop()
    index!: number;

    @Prop()
    beer!: Beer;
};
