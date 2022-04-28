import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { PresenceStatsGlobalService } from '../presence-stats-global.service'


export interface Card {
    activity: string;
    address: string;
    age: string;
    color: string;
    gender: string;
    income: string;
    nationalty: string;
    period: string;
    presence: {
        total: number;
        radius: number;
        percent: number;
    };
    radius: number;
    title: string;
    percent: number,
    transit: number;
}




@Injectable({ providedIn: 'root' })
export class PresenceStatsCardsService {

    public cards$: BehaviorSubject<[]> = new BehaviorSubject(undefined);

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
        let result = cards.sort((a, b) => b.presence.total - a.presence.total);
        return result;
    }

    // for circle radius in front
    getTheMaxPresence(pois): number {

        let presences = [];
        let max: number = 0;

        pois.forEach((poi: any) => {
            presences.push(poi.properties.summary.presence.total);
        });

        max = Math.max(...presences);
        return max;
    }

    sumFunc(total, num) {
        return total + num;
    }
    getTheSumPresence(pois): number {

        let presences = [];
        let sum: number = 0;

        pois.forEach((poi: any) => {
            presences.push(poi.properties.summary.presence.total);
        });

        sum = presences.reduce(this.sumFunc);
        return sum;

    }


    changeCards(pois: any[]): void {
        let result = [];
        let maxPresence = this.getTheMaxPresence(pois);
        let sumPresence = this.getTheSumPresence(pois);

        pois.forEach((poi: any, i: number) => {
            result.push({
                presence: {
                    total: null,
                    radius: null,
                    percent: null
                }
            });
            let presence = poi.properties.summary.presence;
            result[i].color = poi.properties.color;
            result[i].title = poi.properties.id; // change for enseña name
            result[i].address = poi.properties.nombre; // change for real address
            result[i].presence.total = presence.total;
            result[i].income = this.getWinner(presence.income);
            result[i].gender = this.getWinner(presence.sex);
            result[i].age = this.getWinner(presence.age);
            result[i].nationalty = this.getWinner(presence.nationalty);
            result[i].period = this.getWinner(presence.period);
            result[i].activity = this.getWinner(presence.activity);
            result[i].transit = presence.activity.t;
            result[i].presence.radius = presence.total / maxPresence;
            result[i].presence.percent = presence.total * 100 / sumPresence;
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
