import Beer from './Beer';

export default class BeerSortMode {
    name!: string;
    sortProp!: (beer: Beer) => any;

    constructor(name: string, sortProp: (beer: Beer) => any) {
        this.name = name;
        this.sortProp = sortProp;
    }
}