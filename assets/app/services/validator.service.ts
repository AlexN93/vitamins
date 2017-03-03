import {Injectable} from '@angular/core';

@Injectable()
export class ValidatorService {
    possibleColors:Array<string>;

    constructor() {
        console.log('ValidatorService Initialized...');
        this.possibleColors = ['G', 'B', 'W'];
    }

    /**
     * Returns if the vitamin string is valid, vitamins as an array of objects, vitamins per rod (color)
     * @param {String} list
     * @return {boolean} isValid
     * @return {array} weightList
     * @return {object} rods
     */
    validateVitaminList(list):boolean | any[] | {} {
        let vitamins = list.split(' '),
            weightList = [],
            rods = {
                'G': [],
                'B': [],
                'W': []
            },
            isValid = true,
            possibleColors = this.possibleColors;

        vitamins.forEach(function (vitamin, index) {
            let weight = vitamin.match(/\d+/) ? vitamin.match(/\d+/)[0] : 0;
            let color = vitamin.replace(weight, '');
            weightList.push({
                weight: weight,
                color: color
            });
            if (vitamin.indexOf(weight) !== 0 || parseInt(vitamin) < 3 || parseInt(vitamin) < weightList[index - 1]) {
                isValid = false;
            }
            else if (color.length > 1 || possibleColors.indexOf(color) === -1) {
                isValid = false;
            }
            else {
                rods[color].push(parseInt(weight));
            }
        });

        return [isValid, weightList, rods];
    }

    /**
     * Returns if the vitamin string is valid and a state change can be made, vitamins as an array of objects
     * @param {String} list_1
     * @param {String} list_2
     * @return {boolean} isValid
     * @return {array} newState
     */
    validateTransformation(list_1, list_2):boolean | any[] {
        let isValid = true,
            newState = [],
            isInitValid = this.validateVitaminList(list_1),
            isFinalValid = this.validateVitaminList(list_2),
            vitamins_1 = list_1.split(' '),
            vitamins_2 = list_2.split(' ');

        if (!isInitValid[0] || !isFinalValid[0] || vitamins_1.length !== vitamins_2.length) {
            isValid = false;
        }
        else {
            vitamins_1.forEach(function (vitamin_1, index) {
                let weight_1 = vitamin_1.match(/\d+/)[0],
                    weight_2 = vitamins_2[index].match(/\d+/)[0];
                let color_1 = vitamin_1.replace(weight_1, ''),
                    color_2 = vitamins_2[index].replace(weight_2, '');

                if (weight_1 !== weight_2) {
                    isValid = false;
                }
                else if (color_1 !== color_2) {
                    newState.push({
                        weight: weight_1,
                        color: color_2
                    });
                }
            });
        }

        return [isValid, newState];
    }

    /**
     * Validate json input
     * @param {String} str
     * @return {boolean} true/false
     */
    validateJSONString(str):boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}