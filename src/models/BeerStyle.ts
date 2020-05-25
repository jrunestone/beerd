
export default class BeerStyle {
    name!: string;
    abbrName!: string;

    constructor(name: string) {
        this.name = name;
        this.abbrName = this.name.replace(/^([^-]+).+/, '$1');
    }
}