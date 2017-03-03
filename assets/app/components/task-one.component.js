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
var vitamins_service_1 = require("../services/vitamins.service");
var validator_service_1 = require("../services/validator.service");
var TaskOneComponent = (function () {
    function TaskOneComponent(vitaminsService, validatorService) {
        this.vitaminsService = vitaminsService;
        this.validatorService = validatorService;
        this.list = '3B 4B 5B';
        this.validList = true;
        this.retrieveActions(this.list);
    }
    TaskOneComponent.prototype.submitForm = function (e) {
        e.preventDefault();
        var validationResponse = this.validatorService.validateVitaminList(this.list);
        this.validList = validationResponse[0] ? true : false;
        if (this.validList) {
            this.retrieveActions(this.list);
        }
    };
    TaskOneComponent.prototype.retrieveActions = function (list) {
        var _this = this;
        this.vitaminsService.postVitamins('{"vitamins":"' + list + '"}').subscribe(function (response) {
            console.log(response);
            _this.actions = response.actions;
        });
    };
    return TaskOneComponent;
}());
TaskOneComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'taskOne',
        templateUrl: '../layouts/task-one.component.html',
        providers: [vitamins_service_1.VitaminsService, validator_service_1.ValidatorService]
    }),
    __metadata("design:paramtypes", [vitamins_service_1.VitaminsService, validator_service_1.ValidatorService])
], TaskOneComponent);
exports.TaskOneComponent = TaskOneComponent;
//# sourceMappingURL=task-one.component.js.map