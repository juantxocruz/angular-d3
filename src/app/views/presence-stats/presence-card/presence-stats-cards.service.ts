import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { PresenceStatsGlobalService } from '../presence-stats-global.service'


export interface Card {
    color: string,
    title: string,
    address: string,
    presence: number,
    income: string,
    gender: string,
    age: string,
    nationalty: string,
    period: string,
    activity: string,
    transit: number
}

@Injectable({ providedIn: 'root' })
export class PresenceStatsCardsService {

    public cards$: BehaviorSubject<any> = new BehaviorSubject(undefined);

    constructor(public http: HttpClient, private router: Router, private presenceStatsGlobalService: PresenceStatsGlobalService) { }


    getWinner(data) {
        let dictionary = this.presenceStatsGlobalService.getDictionary();
        let entries = Object.entries(data);
        let sorted = entries.sort((a: any, b: any) => b[1] - a[1]);
        let winner = sorted[0] && sorted[1] && (sorted[0][0] === 't') ? sorted[1] : sorted[0];
        let wording = dictionary[winner[0]];
        return this.presenceStatsGlobalService.capitalize(wording);

    }

    sortCards(cards: Card[]): Card[] {
        let result = cards.sort((a, b) => b.presence - a.presence);
        return result;
    }


    changeCards(pois: any[]): void {
        let result = [];

        pois.forEach((poi: any, i: number) => {
            result.push({});
            let presence = poi.properties.summary.presence;
            result[i].color = poi.properties.color;
            result[i].title = poi.properties.id; // change for enseña name
            result[i].address = poi.properties.nombre; // change for real address
            result[i].presence = presence.total;
            result[i].income = this.getWinner(presence.income);
            result[i].gender = this.getWinner(presence.sex);
            result[i].age = this.getWinner(presence.age);
            result[i].nationalty = this.getWinner(presence.nationalty);
            result[i].period = this.getWinner(presence.period);
            result[i].activity = this.getWinner(presence.activity);
            result[i].transit = presence.activity.t;
        });

        let sorted = this.sortCards(result);
        this.setCards(sorted);
        // return result;
    }


    public getCards() {
        return this.cards$.asObservable();
    }
    public setCards(d) {
        this.cards$.next(d);
    }



}
