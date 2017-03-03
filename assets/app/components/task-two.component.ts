import {Component} from '@angular/core';
import {ValidatorService} from '../services/validator.service';
import {NGonService} from '../services/ngon.service';

@Component({
    moduleId: module.id,
    selector: 'taskTwo',
    templateUrl: '../layouts/task-two.component.html',
    providers: [ValidatorService, NGonService]
})

export class TaskTwoComponent {
    initList:string;
    finalList:string;
    validList:Array<boolean>;
    vitaminObjects:Array<any>;

    constructor(private validatorService:ValidatorService, private ngonService:NGonService) {
        this.initList = '3B 4B 5G 6W';
        this.finalList = '3G 4W 5G 6B';
        this.validList = [true, true];
        this.vitaminObjects = [];
    }

    visualizeVitamins(e) {
        e.preventDefault();
        let validationResponse = this.validatorService.validateVitaminList(this.initList);
        this.validList[0] = validationResponse[0] ? true : false;
        if (this.validList[0]) {
            let _this = this;
            _this.vitaminObjects = [];
            validationResponse[1].forEach(function (vitamin, index) {
                let vitId = vitamin.color + vitamin.weight + index;
                _this.ngonService.createElement(vitId, vitamin, index);
                _this.vitaminObjects.push({
                    id: vitId,
                    weight: vitamin.weight,
                    color: vitamin.color
                });
            });
            console.log(this.vitaminObjects);
        }
    }

    transformVitamins(e) {
        e.preventDefault();
        let transform = this.validatorService.validateTransformation(this.initList, this.finalList);
        this.validList[1] = transform[0] ? true : false;
        if (transform[0] && this.vitaminObjects.length) {
            let _this = this;
            transform[1].forEach(function (vitamin, index) {
                _this.vitaminObjects[index].color = vitamin.color;
                _this.vitaminObjects[index].weight = vitamin.weight;
                _this.ngonService.changeColor(_this.vitaminObjects[index].id, vitamin.color);
            });
        }
    }
}