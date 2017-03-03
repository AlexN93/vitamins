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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var VitaminsService = (function () {
    function VitaminsService(http) {
        this.http = http;
        console.log('VitaminsService Initialized...');
        this.url = '/api/vitamins/';
    }
    /**
     * Posts vitamin string to /api/vitamins/ and retrieves the actions needed for makeAllWhite.
     * The requests are stored in the db for later faster usage.
     * @param {object} json
     * @return {object}
     */
    VitaminsService.prototype.postVitamins = function (json) {
        return this.http.post(this.url, json)
            .map(function (res) { return res.json(); });
    };
    return VitaminsService;
}());
VitaminsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], VitaminsService);
exports.VitaminsService = VitaminsService;
//# sourceMappingURL=vitamins.service.js.map