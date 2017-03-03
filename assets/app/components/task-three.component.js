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
var validator_service_1 = require("../services/validator.service");
var ngon_service_1 = require("../services/ngon.service");
var TaskThreeComponent = (function () {
    function TaskThreeComponent(validatorService, ngonService) {
        this.validatorService = validatorService;
        this.ngonService = ngonService;
        this.initList = '3G 4G';
        this.actionList = '[[4, "G", "B"],[3, "G", "W"],[4, "B", "W"]]';
        this.validList = [true, true];
        this.states = [];
        this.vitaminObjects = [];
    }
    TaskThreeComponent.prototype.calculateStates = function (e) {
        e.preventDefault();
        var validationResponse = this.validatorService.validateVitaminList(this.initList), states = [this.initList];
        this.validList[0] = validationResponse[0] ? true : false;
        this.validList[1] = this.validatorService.validateJSONString(this.actionList);
        if (this.validList[0] && this.validList[1]) {
            var _this_1 = this, vitamins = validationResponse[1], rods_1 = validationResponse[2], actions = JSON.parse(this.actionList), possibleColors_1 = this.validatorService.possibleColors;
            this.vitaminObjects = [];
            vitamins.forEach(function (vitamin, index) {
                var vitId = vitamin.color + vitamin.weight + index;
                _this_1.ngonService.createElement(vitId, vitamin, index);
                _this_1.vitaminObjects.push({
                    id: vitId,
                    weight: vitamin.weight,
                    color: vitamin.color
                });
            });
            // console.log(this.vitaminObjects);
            try {
                actions.forEach(function (action, index) {
                    var weight = action[0], from = action[1], to = action[2], fromString = weight + from, toString = weight + to;
                    if (isNaN(weight) || possibleColors_1.indexOf(from) === -1 || possibleColors_1.indexOf(to) === -1) {
                        throw "invalid actions";
                    }
                    if (weight < rods_1[from][rods_1[from].length - 1] || weight < rods_1[to][rods_1[to].length - 1]) {
                        throw "invalid actions";
                    }
                    var pos = states[index].lastIndexOf(fromString), newState = states[index].substr(0, pos) + toString + states[index].substr(pos + toString.length);
                    states.push(newState);
                    rods_1[from].pop();
                    rods_1[to].push(weight);
                    // console.log('newState', newState);
                    // console.log('element', _this.vitaminObjects[pos/3].id, to);
                    (function (index, pos, to) {
                        window.setTimeout(function () {
                            _this_1.ngonService.changeColor(_this_1.vitaminObjects[pos / 3].id, to);
                        }, index * 1000 + 1000);
                    }(index, pos, to));
                });
            }
            catch (error) {
                console.log(error);
                this.validList[1] = false;
            }
            console.log('states', states);
            this.states = states;
        }
    };
    return TaskThreeComponent;
}());
TaskThreeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'taskThree',
        templateUrl: '../layouts/task-three.component.html',
        providers: [validator_service_1.ValidatorService, ngon_service_1.NGonService]
    }),
    __metadata("design:paramtypes", [validator_service_1.ValidatorService, ngon_service_1.NGonService])
], TaskThreeComponent);
exports.TaskThreeComponent = TaskThreeComponent;
//# sourceMappingURL=task-three.component.js.map