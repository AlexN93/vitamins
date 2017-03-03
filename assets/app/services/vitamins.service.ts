import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VitaminsService {
    url: string;

    constructor(private http: Http){
        console.log('VitaminsService Initialized...');
        this.url = '/api/vitamins/';
    }

    /**
     * Posts vitamin string to /api/vitamins/ and retrieves the actions needed for makeAllWhite.
     * The requests are stored in the db for later faster usage.
     * @param {object} json
     * @return {object}
     */
    postVitamins(json){
        return this.http.post(this.url, json)
            .map(res => res.json());
    }
}