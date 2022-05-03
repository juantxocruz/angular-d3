import { Injectable } from "@angular/core";
import { TooltipStyleService } from "./tooltipStyle.service";
import { ColorsService } from "./colors.service";


@Injectable()
export class GroupedVerticalBarLayoutService {


    //indicatorsDictionary;
    colors: any = this.colorsService.colors;
    tooltipValues: any = this.tooltipStyleService.tooltipValues;
    layoutSelected: any;



    constructor(
        private colorsService: ColorsService,
        private tooltipStyleService: TooltipStyleService,
    ) { }


    public layouts: any[] = [
        {
            // vertical bar chart
            key: "indicators_bars",
            section: "indicators",
            design: {
                height: 240,
                width: null,
                margin: { top: 16, right: 8, bottom: 42, left: 80 },
                stroke: {
                    width: 0.2,
                    stroke: this.colors.black,
                },
                style: {
                    colors: [
                        this.colors.primary_color,
                        this.colors.gray_medium,
                        this.colors.gray_light,
                        this.colors.red
                    ],
                    paddingInner: 0.2,
                    padding: 0.05,
                    align: 0.1,
                    legend: {
                        fontSize: "10px",
                    },
                    averages: {},
                },
            },
            resize_delay: 400,

            viewChartLegend: false,
            xVal: {
                name: "Zona de influencia",
            },
            yVal: [
                { key: "val", name: "Número", value: "Nº" },
                { key: "perf", name: "Porcentaje", value: "% variación" },
            ],
            dictionary: [
                {
                    name: null,
                    key: "screen_name",
                },
            ],
            tooltip: {
                id: "indicators",
                style: this.tooltipValues,
                header: null//   key [string, "personas_hogar"], value [number], category[string, "Resto"] or index[string, "tienda_3_Resto"]

            },
        },
        {
            // vertical bar chart
            key: "presence_income",
            section: "Glocally Popular Times Presence Income",

            design: {
                height: 240,
                width: null,
                margin: { top: 16, right: 8, bottom: 42, left: 80 },
                stroke: {
                    width: 0.2,
                    stroke: this.colors.black,
                },
                style: {
                    colors: [
                        this.colors.primary_color,
                        this.colors.gray_medium,
                        this.colors.gray_light,
                        this.colors.red
                    ],
                    paddingInner: 0.2,
                    padding: 0.05,
                    align: 0.1,
                    legend: {
                        fontSize: "10px",
                    },
                    averages: {},
                },
            },
            resize_delay: 400,

            viewChartLegend: false,
            xVal: {
                name: "Ingresos",
            },
            yVal: [
                { key: "val", name: "Número", value: "Nº" },
                { key: "perf", name: "Porcentaje", value: "% variación" },
            ],
            dictionary: [
                {
                    name: null,
                    key: "screen_name",
                },
            ],
            tooltip: {
                id: "indicators",
                style: this.tooltipValues,
                header: null//   key [string, "personas_hogar"], value [number], category[string, "Resto"] or index[string, "tienda_3_Resto"]

            },
        }

    ];

    public getLayout(key: string): any {
        let layout = this.layouts.filter((l) => {
            return l.key === key;
        });
        return layout;
    }
}
