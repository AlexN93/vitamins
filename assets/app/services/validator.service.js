"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValidatorService = (function () {
    function ValidatorService() {
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
    ValidatorService.prototype.validateVitaminList = function (list) {
        var vitamins = list.split(' '), weightList = [], rods = {
            'G': [],
            'B': [],
            'W': []
        }, isValid = true, possibleColors = this.possibleColors;
        vitamins.forEach(function (vitamin, index) {
            var weight = vitamin.match(/\d+/) ? vitamin.match(/\d+/)[0] : 0;
            var color = vitamin.replace(weight, '');
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
    };
    /**
     * Returns if the vitamin string is valid and a state change can be made, vitamins as an array of objects
     * @param {String} list_1
     * @param {String} list_2
     * @return {boolean} isValid
     * @return {array} newState
     */
    ValidatorService.prototype.validateTransformation = function (list_1, list_2) {
        var isValid = true, newState = [], isInitValid = this.validateVitaminList(list_1), isFinalValid = this.validateVitaminList(list_2), vitamins_1 = list_1.split(' '), vitamins_2 = list_2.split(' ');
        if (!isInitValid[0] || !isFinalValid[0] || vitamins_1.length !== vitamins_2.length) {
            isValid = false;
        }
        else {
            vitamins_1.forEach(function (vitamin_1, index) {
                var weight_1 = vitamin_1.match(/\d+/)[0], weight_2 = vitamins_2[index].match(/\d+/)[0];
                var color_1 = vitamin_1.replace(weight_1, ''), color_2 = vitamins_2[index].replace(weight_2, '');
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
    };
    /**
     * Validate json input
     * @param {String} str
     * @return {boolean} true/false
     */
    ValidatorService.prototype.validateJSONString = function (str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    return ValidatorService;
}());
ValidatorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ValidatorService);
exports.ValidatorService = ValidatorService;
//# sourceMappingURL=validator.service.js.map