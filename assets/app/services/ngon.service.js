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
var NGonService = (function () {
    function NGonService() {
        console.log('N-gonService Initialized...');
        this.colorMap = {
            'G': 'grey',
            'B': 'black',
            'W': 'white'
        };
        // TODO - needs to be rewritten not to use hardcoded values, but calculations depending on weight(sides) and to work with all polygons
        this.rotationMap = {
            '3': -90,
            '4': 45,
            '5': -18,
            '7': 12.5,
            '8': 22.5,
            '9': 30,
            '11': 8,
            '12': 15,
            '13': 21,
            '15': 5,
            '16': 10
        };
    }
    /**
     * Create a n-gon(polygon) svg element and the parent bootstrap divs
     * @param {String} elemId
     * @param {object} vitamin
     * @param {int} index
     */
    NGonService.prototype.createElement = function (elemId, vitamin, index) {
        // console.log(elemId, this.colorMap[vitamin.color], index, index % 6);
        if (index === 0) {
            document.getElementById('vitamin-container').innerHTML = '';
        }
        if (index % 6 === 0) {
            // console.log('appending new row');
            var newRow = document.createElement('div'), rowId = 'row-' + index.toString() + '0';
            newRow.setAttribute('id', rowId);
            newRow.setAttribute('class', 'row');
            document.getElementById('vitamin-container').appendChild(newRow);
        }
        var NS = 'http://www.w3.org/2000/svg', points = [
            vitamin.weight === '3' ? 65 : 80,
            vitamin.weight === '3' || vitamin.weight === '4' ? 80 : 77
        ], elemSize = vitamin.weight === '3' || vitamin.weight === '4' ? 70 : 60, newCell = document.createElement('div'), cellId = 'col-' + index.toString() + (index % 6).toString();
        newCell.setAttribute('id', cellId);
        newCell.setAttribute('class', 'col-md-2');
        document.getElementById('row-' + (index - (index % 6)) + '0').appendChild(newCell);
        var svg = document.createElementNS(NS, 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '150');
        svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        document.getElementById(cellId).appendChild(svg);
        var globG = document.createElementNS(NS, 'g');
        svg.appendChild(globG);
        var elem = document.createElementNS(NS, 'polygon'), pgonPnts = this.getPolygonPoints(vitamin.weight, elemSize, points[0], points[1]);
        elem.setAttribute('class', 'ngon ' + this.colorMap[vitamin.color]);
        elem.setAttribute('points', pgonPnts.join());
        elem.id = elemId;
        if (this.rotationMap[vitamin.weight]) {
            elem.setAttribute('style', 'transform: rotate(' + this.rotationMap[vitamin.weight] + 'deg)');
        }
        var number = document.createElementNS(NS, 'text');
        number.setAttribute('x', '45%');
        number.setAttribute('y', '100%');
        number.setAttribute('fill', '#000000');
        number.textContent = vitamin.weight;
        globG.appendChild(number);
        globG.appendChild(elem);
    };
    /**
     * Helper method to calculate the polygon points
     * @param {int} vCnt
     * @param {int} radius
     * @param {int} centerX
     * @param {int} centerY
     * @return {object} myPoints
     */
    NGonService.prototype.getPolygonPoints = function (vCnt, radius, centerX, centerY) {
        var myPoints = [], polyXPts = Array(vCnt), polyYPts = Array(vCnt), vertexAngle = 360 / vCnt;
        for (var v = 0; v < vCnt; v++) {
            var theAngle = (v * vertexAngle) * Math.PI / 180;
            polyXPts[v] = radius * Math.cos(theAngle);
            polyYPts[v] = -radius * Math.sin(theAngle);
        }
        for (var v_1 = 0; v_1 < vCnt; v_1++) {
            var point = [centerX + polyXPts[v_1], centerY + polyYPts[v_1]];
            myPoints.push(point);
        }
        return myPoints;
    };
    /**
     * Helper method that changes the color of already created vitamin(polygon)
     * @param {string} elemId
     * @param {string} color
     */
    NGonService.prototype.changeColor = function (elemId, color) {
        var elem = document.getElementById(elemId);
        elem.classList.remove('black', 'grey', 'white');
        elem.classList.add(this.colorMap[color]);
    };
    return NGonService;
}());
NGonService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], NGonService);
exports.NGonService = NGonService;
//# sourceMappingURL=ngon.service.js.map