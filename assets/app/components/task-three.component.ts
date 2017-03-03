import {Component} from '@angular/core';
import {ValidatorService} from '../services/validator.service';
import {NGonService} from '../services/ngon.service';

@Component({
    moduleId: module.id,
    selector: 'taskThree',
    templateUrl: '../layouts/task-three.component.html',
    providers: [ValidatorService, NGonService]
})

export class TaskThreeComponent {
    initList:string;
    actionList:string;
    validList:Array<boolean>;
    states:Array<any>;
    vitaminObjects:Array<any>;

    constructor(private validatorService:ValidatorService, private ngonService:NGonService) {
        this.initList = '3G 4G';
        this.actionList = '[[4, "G", "B"],[3, "G", "W"],[4, "B", "W"]]';
        this.validList = [true, true];
        this.states = [];
        this.vitaminObjects = [];
    }

    calculateStates(e) {
        e.preventDefault();
        let validationResponse = this.validatorService.validateVitaminList(this.initList),
            states = [this.initList];
        this.validList[0] = validationResponse[0] ? true : false;
        this.validList[1] = this.validatorService.validateJSONString(this.actionList);
        if (this.validList[0] && this.validList[1]) {
            let _this = this,
                vitamins = validationResponse[1],
                rods = validationResponse[2],
                actions = JSON.parse(this.actionList),
                possibleColors = this.validatorService.possibleColors;


            this.vitaminObjects = [];
            vitamins.forEach(function (vitamin, index) {
                let vitId = vitamin.color + vitamin.weight + index;
                _this.ngonService.createElement(vitId, vitamin, index);
                _this.vitaminObjects.push({
                    id: vitId,
                    weight: vitamin.weight,
                    color: vitamin.color
                });
            });
            // console.log(this.vitaminObjects);
            try {
                actions.forEach(function (action, index) {
                    let weight = action[0],
                        from = action[1],
                        to = action[2],
                        fromString = weight + from,
                        toString = weight + to;
                    if (isNaN(weight) || possibleColors.indexOf(from) === -1 || possibleColors.indexOf(to) === -1) {
                        throw "invalid actions";
                    }

                    if (weight < rods[from][rods[from].length - 1] || weight < rods[to][rods[to].length - 1]) {
                        throw "invalid actions";
                    }

                    let pos = states[index].lastIndexOf(fromString),
                        newState = states[index].substr(0, pos) + toString + states[index].substr(pos + toString.length);

                    states.push(newState);
                    rods[from].pop();
                    rods[to].push(weight);

                    // console.log('newState', newState);
                    // console.log('element', _this.vitaminObjects[pos/3].id, to);

                    (function(index, pos, to){
                        window.setTimeout(function(){
                            _this.ngonService.changeColor(_this.vitaminObjects[pos/3].id, to);
                        }, index * 1000 + 1000);
                    }(index, pos, to));
                });
            } catch (error) {
                console.log(error);
                this.validList[1] = false;
            }
            console.log('states', states);
            this.states = states;
        }
    }
}