import { Injectable } from "@angular/core";
import { TooltipStyleService } from "../services/tooltipStyle.service";
import { ColorsService } from "../services/colors.service";
import { DefaultVarsService } from "../services/default-vars.service";
@Injectable()
export class HeatmapLayoutService {

    colors: any = this.colorsService.colors;
    tooltipValues: any = this.tooltipStyleService.tooltipValues;
    layoutSelected: any;

    constructor(
        private colorsService: ColorsService,
        private tooltipStyleService: TooltipStyleService,
        private defaultVarsService: DefaultVarsService
    ) { }

    // demo
    public layouts: any[] = [
        {
            // vertical bar chart
            key: "popular_times_heatmap",
            class: "heatmap popular-times",
            section: "popular-times",
            innerRadius: 2,
            height: 424,
            width: null,
            margin: { top: 24, right: 8, bottom: 64, left: 64 },
            stroke: {
                width: 0.2,
                stroke: this.colors.black,
            },
            colors: ["#ffffff", '#eff8a9', '#e1f3a0', '#a7dba1', '#fed080', '#fcb668', '#f58450', '#ef6e4a', '#e0504a'], //white, green, yellow, red n
            paddingInner: 0.01,
            padding: 0.01,
            tickSize: 4, // 0 to 100 to see de ticks
            removeDomain: false, // false if you want to see the axis
            borderRadius: 2,
            align: 0.1,
            averages: {},
            legend: {
                fontSize: "10px",
                visible: true,
                width: 200,
                height: 16,
                steps: 4,
                margin: { top: 24, right: 8, bottom: 8, left: 8 },
                text: ["Poco ocupado", "Muy ocupado"]


            },
            // which field name in your data represents the x axis (horizontal)- default "x"
            xField: 'x',
            // which field name in your data represents the y axis (vertical) - default "y"
            yField: 'y',
            // which field name in your data represents the data value - default "value"
            valueField: 'value',
            xLabels: ["L", "M", "X", "J", "V", "S", "D"],
            //yLabels: ["6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM", "12AM", "1AM", "2AM", "3AM", "4AM", "5AM"],
            yLabels: ["6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM", "12AM"],
            lang: 'es',
            dictionary: [
                { key: "x", index: 0, en: "Monday", es: "Lunes" },
                { key: "x", index: 1, en: "Tuesday", es: "Martes" },
                { key: "x", index: 2, en: "Wednesday", es: "Miércoles" },
                { key: "x", index: 3, en: "Thursday", es: "Jueves" },
                { key: "x", index: 4, en: "Friday", es: "Viernes" },
                { key: "x", index: 5, en: "Saturday", es: "Sábado" },
                { key: "x", index: 6, en: "Sunday", es: "Domingo" },
                { key: "y", index: 0, en: "6AM", es: "06:00" },
                { key: "y", index: 1, en: "7AM", es: "07:00" },
                { key: "y", index: 2, en: "8AM", es: "08:00" },
                { key: "y", index: 3, en: "9AM", es: "09:00" },
                { key: "y", index: 4, en: "10AM", es: "10:00" },
                { key: "y", index: 5, en: "11AM", es: "11:00" },
                { key: "y", index: 6, en: "12PM", es: "12:00" },
                { key: "y", index: 7, en: "1PM", es: "13:00" },
                { key: "y", index: 8, en: "2PM", es: "14:00" },
                { key: "y", index: 9, en: "3PM", es: "15:00" },
                { key: "y", index: 10, en: "4PM", es: "16:00" },
                { key: "y", index: 11, en: "5PM", es: "17:00" },
                { key: "y", index: 12, en: "6PM", es: "18:00" },
                { key: "y", index: 13, en: "7PM", es: "19:00" },
                { key: "y", index: 14, en: "8PM", es: "20:00" },
                { key: "y", index: 15, en: "9PM", es: "21:00" },
                { key: "y", index: 16, en: "10PM", es: "22:00" },
                { key: "y", index: 17, en: "11PM", es: "23:00" },
                { key: "y", index: 18, en: "12AM", es: "24:00" },
                { key: "y", index: 19, en: "1AM", es: "01:00" },
                { key: "y", index: 20, en: "2AM", es: "02:00" },
                { key: "y", index: 21, en: "3AM", es: "03:00" },
                { key: "y", index: 22, en: "4AM", es: "04:00" },
                { key: "y", index: 23, en: "5AM", es: "05:00" }
            ],
            tooltip: {
                id: "popular_times_tip",
                style: this.tooltipValues,
                header: null//   key [string, "personas_hogar"], value [number], category[string, "Resto"] or index[string, "tienda_3_Resto"]


            },
            default_time: this.defaultVarsService.default_time
        }
    ];

    public getLayout(key: string): any {
        let layout = this.layouts.filter((l) => {
            return l.key === key;
        })[0];
        return layout;
    }
}
