import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Counter extends Vue {
    get count() {
        return this.$store.state.count;
    }

    countUp() {
        this.$store.commit('countUp');
    }
};