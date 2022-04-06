import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, filter } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';


export interface weekDot {
    x: string, // day
    y: string, // hour
    value: number
}
export interface weekPoi {
    id: number; // poi id
    values: weekDot
}


@Injectable({ providedIn: 'root' })
export class HeatmapPageService {

    private popularTimesUrl = 'assets/data/samples_popular_times.json';
    public popularTimesWeek$: BehaviorSubject<any> = new BehaviorSubject(undefined);
    public popularTimesDot$: BehaviorSubject<any> = new BehaviorSubject(undefined);

    private globalPois: any[];
    private uniquePois: any[];
    private googlePois: any[];
    private popularTimesWeek: weekPoi[];




    public choices_days = [[0, "Sunday"], [1, "Monday"], [2, "Tuesday"], [3, "Wednesday"], [4, "Thursday"], [5, "Friday"], [6, "Saturday"]];

    // THE ORIGINAL OBJECT TO MAP ALL HOURS
    /*
    public choices_hours = [
        [0, "6AM", 6],
        [1, "7AM", 7],
        [2, "8AM", 8],
        [3, "9AM", 9],
        [4, "10AM", 10],
        [5, "11AM", 11],
        [6, "12PM", 12],
        [7, "1PM", 13],
        [8, "2PM", 14],
        [9, "3PM", 15],
        [10, "4PM", 16],
        [11, "5PM", 17],
        [12, "6PM", 18],
        [13, "7PM", 19],
        [14, "8PM", 20],
        [15, "9PM", 21],
        [16, "10PM", 22],
        [17, "11PM", 23],
        [18, "12AM", 0],
        [19, "1AM", 1],
        [20, "2AM", 2],
        [21, "3AM", 3],
        [22, "4AM", 4],
        [23, "5AM", 5]
    ];
    */

    // THE PRODUCTION OBJECT TO MAP SOME HOURS
    // remove hours from here if you want to make the chart with less hours.
    public choices_hours = [
        [0, "6AM", 6],
        [1, "7AM", 7],
        [2, "8AM", 8],
        [3, "9AM", 9],
        [4, "10AM", 10],
        [5, "11AM", 11],
        [6, "12PM", 12],
        [7, "1PM", 13],
        [8, "2PM", 14],
        [9, "3PM", 15],
        [10, "4PM", 16],
        [11, "5PM", 17],
        [12, "6PM", 18],
        [13, "7PM", 19],
        [14, "8PM", 20],
        [15, "9PM", 21],
        [16, "10PM", 22],
        [17, "11PM", 23],
        [18, "12AM", 0]

    ];


    constructor(public http: HttpClient, private router: Router) { }


    // Testing for primitives: undefined null boolean string number
    isPrimitive(o: any) { return typeof o !== 'object' || null };

    // PRO API
    handleError(error: HttpErrorResponse) {
        const kk = null;
        return of(kk);
    }

    public filterGooglePois(data: any): any[] {
        let result = data.filter((d: any) => {
            if (d.geometry && d.geometry.coordinates && d.geometry.coordinates[0] && d.geometry.coordinates[1] && d.properties && d.properties.goo && d.properties.goo.popular_time && d.properties.goo.popular_time.days) {
                return true;
            }
            return false;
        });
        return result;
    }

    getHourValue(poi: any, day: any[], hour: any[]) {
        // isPrimitive(d.days[day_index]) ? 0 : d.days[day_index][hour[2]] ? d.days[day_index][hour[2]] : 0
        let route: any = poi.properties.goo.popular_time.days;
        if (this.isPrimitive(route[day[0]]) || !route[day[0]] || !route[day[0]][hour[2]]) {
            return 0;
        }

        return route[day[0]][hour[2]];



    }
    getPopularTimesWeek(data: any[]): weekPoi[] {

        let result: any[] = [];
        this.choices_days.forEach((day: any[]) => {
            this.choices_hours.forEach((hour: any[]) => {
                data.forEach((d: any, d_index: number) => {
                    result.push(
                        {
                            id: d.properties.id,
                            values: {
                                y: hour,
                                x: day,
                                value: this.getHourValue(d, day, hour)
                            }
                        }
                    )
                });
            })
        });
        return result;
    }




    filterUniqueIds(data: any) {
        let uniqueIDs: Array<number> = [];
        let result: Array<any> = [];

        data.forEach((d: any) => {
            if (uniqueIDs.indexOf(d.properties.id) < 0) {
                uniqueIDs.push(d.properties.id);
                result.push(d);
            }
        });
        return result;
    }

    filterPopularPoisOptions(data: any) {
        let result: Array<number> = [];
        data.forEach((d: any) => {
            if (result.indexOf(d.id) < 0) { result.push(d.id) }
        });
        return result;
    }




    // DEV API fn
    public getPopularTimesApi = () => {
        return this.http.get(`${this.popularTimesUrl}`).pipe(
            catchError(this.handleError),
            map((data: any) => {

                // map data here if needed
                this.globalPois = data.map((poi: any) => {
                    return poi;
                }); // all pois
                this.uniquePois = this.filterUniqueIds(this.globalPois); // removes duplicates
                this.googlePois = this.filterGooglePois(this.uniquePois); // only pois with google data
                this.popularTimesWeek = this.getPopularTimesWeek(this.googlePois); // all week pois ready for heatmap
                this.popularTimesWeek$.next(this.popularTimesWeek);
                return this.popularTimesWeek;
            })
        );
    }




    public getPopularTimes() {
        return this.popularTimesWeek$.asObservable();
    }
    public setPopularTimes(pois: any[]) {
        this.popularTimesWeek$.next(pois);
    }
}
