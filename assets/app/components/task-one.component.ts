import {Component} from '@angular/core';
import {VitaminsService} from '../services/vitamins.service';
import {ValidatorService} from '../services/validator.service';

@Component({
    moduleId: module.id,
    selector: 'taskOne',
    templateUrl: '../layouts/task-one.component.html',
    providers: [VitaminsService, ValidatorService]
})

export class TaskOneComponent {
    list:string;
    actions:string;
    validList:boolean;

    constructor(private vitaminsService:VitaminsService, private validatorService:ValidatorService) {
        this.list = '3B 4B 5B';
        this.validList = true;
        this.retrieveActions(this.list);
    }

    submitForm(e) {
        e.preventDefault();
        let validationResponse = this.validatorService.validateVitaminList(this.list);
        this.validList = validationResponse[0] ? true : false;
        if (this.validList) {
            this.retrieveActions(this.list);
        }
    }

    retrieveActions(list) {
        this.vitaminsService.postVitamins('{"vitamins":"' + list + '"}').subscribe(response => {
            console.log(response);
            this.actions = response.actions;
        });
    }
}