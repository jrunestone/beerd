
export default class BeerStyle {
    name!: string;
    abbrName!: string;
    sortOrder!: number;

    styleMap: Array<Array<string|RegExp|number>> = [
        ['DNEIPA', new RegExp('IPA - Imperial / Double New England'), 10],
        ['NEIPA', new RegExp('^IPA -.*New England'), 20],
        ['DIPA', new RegExp('^IPA -.*(Imperial|Triple|Quadruple)'), 30],
        ['IPA', new RegExp('^IPA -'), 40],
        ['PSTOUT', new RegExp('^(Stout|Porter) -.*Pastry'), 50],
        ['DSTOUT', new RegExp('^(Stout|Porter) -.*Imperial'), 60],
        ['STOUT', new RegExp('^(Stout|Porter) - '), 70],
        ['SOUR', new RegExp('^Sour - '), 80],
        ['OTHER', new RegExp('.*'), 90]
    ];

    constructor(name: string) {
        this.name = name;

        for (const style of this.styleMap) {
            if ((<RegExp>style[1]).test(this.name)) {
                this.abbrName = <string>style[0];
                this.sortOrder = <number>style[2];
                break;
            }
        }
    }
}