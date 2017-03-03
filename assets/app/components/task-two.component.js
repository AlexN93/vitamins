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
var TaskTwoComponent = (function () {
    function TaskTwoComponent(validatorService, ngonService) {
        this.validatorService = validatorService;
        this.ngonService = ngonService;
        this.initList = '3B 4B 5G 6W';
        this.finalList = '3G 4W 5G 6B';
        this.validList = [true, true];
        this.vitaminObjects = [];
    }
    TaskTwoComponent.prototype.visualizeVitamins = function (e) {
        e.preventDefault();
        var validationResponse = this.validatorService.validateVitaminList(this.initList);
        this.validList[0] = validationResponse[0] ? true : false;
        if (this.validList[0]) {
            var _this_1 = this;
            _this_1.vitaminObjects = [];
            validationResponse[1].forEach(function (vitamin, index) {
                var vitId = vitamin.color + vitamin.weight + index;
                _this_1.ngonService.createElement(vitId, vitamin, index);
                _this_1.vitaminObjects.push({
                    id: vitId,
                    weight: vitamin.weight,
                    color: vitamin.color
                });
            });
            console.log(this.vitaminObjects);
        }
    };
    TaskTwoComponent.prototype.transformVitamins = function (e) {
        e.preventDefault();
        var transform = this.validatorService.validateTransformation(this.initList, this.finalList);
        this.validList[1] = transform[0] ? true : false;
        if (transform[0] && this.vitaminObjects.length) {
            var _this_2 = this;
            transform[1].forEach(function (vitamin, index) {
                _this_2.vitaminObjects[index].color = vitamin.color;
                _this_2.vitaminObjects[index].weight = vitamin.weight;
                _this_2.ngonService.changeColor(_this_2.vitaminObjects[index].id, vitamin.color);
            });
        }
    };
    return TaskTwoComponent;
}());
TaskTwoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'taskTwo',
        templateUrl: '../layouts/task-two.component.html',
        providers: [validator_service_1.ValidatorService, ngon_service_1.NGonService]
    }),
    __metadata("design:paramtypes", [validator_service_1.ValidatorService, ngon_service_1.NGonService])
], TaskTwoComponent);
exports.TaskTwoComponent = TaskTwoComponent;
//# sourceMappingURL=task-two.component.js.map