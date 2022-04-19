import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, filter } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({ providedIn: 'root' })
export class PopularTimesReshapeService {

    public choices_days = [[0, "Sunday"], [1, "Monday"], [2, "Tuesday"], [3, "Wednesday"], [4, "Thursday"], [5, "Friday"], [6, "Saturday"]];

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

    public dayTimeWindow = {
        "day_window": "Monday 6AM until Tuesday 5AM",
        "day_window_end_int": 1,
        "day_window_end_txt": "Tuesday",
        "day_window_start_int": 0,
        "day_window_start_txt": "Monday",
        "time_local": 7,
        "time_local_12": "7AM",
        "time_local_index": 1,
        "time_window_end": 5,
        "time_window_end_12h": "5AM",
        "time_window_end_ix": 23,
        "time_window_start": 6,
        "time_window_start_12h": "6AM",
        "time_window_start_ix": 0
    };


    constructor(public http: HttpClient, private router: Router) { }


    getGoogleDataPois(data: any) {
        let result = data.filter((d: any) => {
            if (d.geometry && d.geometry.coordinates && d.geometry.coordinates[0] && d.geometry.coordinates[1] && d.properties && d.properties.goo && d.properties.goo.popular_time && d.properties.goo.popular_time.days) {
                return true;
            }
        });
        return result;
    }

    getAllDaysDataByHours(data: any) {
        const temp: Array<Array<Array<any>>> = []; // day,hour, pois

        this.choices_days.forEach((day: any, day_index: number) => {
            temp.push([]); // one day
            this.choices_hours.forEach((hour: any, hour_index) => {
                temp[day_index].push([]); // 24 hours

                data.forEach((d: any) => {

                    temp[day_index][hour_index].push({
                        lat: d.lat,
                        lng: d.lng,
                        count: this.isPrimitive(d.days[day_index]) ? 0 : d.days[day_index][hour[2]] ? d.days[day_index][hour[2]] : 0
                    });
                });
            });
        });
        return temp;
    }

    isPrimitive(o: any) {
        return typeof o !== 'object' || null
    };

    sumWeekDaysData(data: any) {
        const result: any = []

        data.forEach((day: [][], day_index: number) => {
            day.forEach((hour: [], hour_index: number) => {
                if (day_index === 0) {
                    result.push([]);
                }
                hour.forEach((poi: any, poi_index: number) => {
                    if (day_index === 0) {
                        result[hour_index].push(
                            {
                                lat: data[day_index][hour_index][poi_index].lat,
                                lng: data[day_index][hour_index][poi_index].lng,
                                count: data[day_index][hour_index][poi_index].count
                            }
                        )
                    } else {
                        result[hour_index][poi_index].count += data[day_index][hour_index][poi_index].count
                    }
                });
            });
        })

        return result;
    }

    mediaWeekDaysData(hours: [][]) {
        return hours.map((hour: any[]) => {
            hour.map((poi) => {
                poi.count = Math.round(poi.count / 7);
                return poi;
            })
            return hour;
        });
    }

    getDayIndex(configuration: any) {
        return configuration.day_window_start_int === 0 && configuration.day_window_end_int === 6 ? 7 : configuration.day_window_start_int;
    }

    reshapeData(data: any) {
        // return only lat, lng and days
        const googleDays = data.map((d: any) => {
            return {
                lat: d.geometry.coordinates[1],
                lng: d.geometry.coordinates[0],
                days: d.properties.goo.popular_time.days
            }

        });
        // return [ DAY [ HOURS [ POIS ] ] ]
        // DAYS start at 0 is SUNDAY
        // [ HOURS [ POIS ] ] is used to animate map
        // HOURS start at 0 is 6:00am.
        const daysData = this.getAllDaysDataByHours(googleDays);
        const weekData = this.sumWeekDaysData(daysData);
        const weekMediaData = this.mediaWeekDaysData(weekData);
        daysData.push(weekMediaData); // 7 index is the sum of all week day and divided by 7
        return daysData; // all 7 days week [0 Sunday - 6 Saturday] data by hours [0-23] and pois [lat, lgn, count]

    }


}
