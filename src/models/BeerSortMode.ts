import { Beer } from './Beer';

export class BeerSortMode {
    name!: string;
    sortProp!: (beer: Beer) => any;

    constructor(name: string, sortProp: (beer: Beer) => any) {
        this.name = name;
        this.sortProp = sortProp;
    }
}