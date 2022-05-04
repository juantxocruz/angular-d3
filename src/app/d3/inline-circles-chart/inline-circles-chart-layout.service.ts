import { Injectable } from "@angular/core";
import { TooltipStyleService } from "../services/tooltipStyle.service";
import { ColorsService } from "../services/colors.service";


@Injectable()
export class InlineCirclesChartLayoutService {


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
            key: "income_circles",
            section: "Glocally Presence Income Circles",
            design: {
                height: 240,
                width: null,
                margin: { top: 16, right: 8, bottom: 42, left: 80 },
                stroke: {
                    width: 0.2,
                    stroke: this.colors.black,
                },
                text: {
                    color: "#6e6e6e"
                },
                style: {
                    fill: "#C0C0C0", // here null if you want to use colors instead
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
                id: "income_circles_tip",
                style: this.tooltipValues,
                header: null//   key [string, "personas_hogar"], value [number], category[string, "Resto"] or index[string, "tienda_3_Resto"]

            },
        },


    ];

    public getLayout(key: string): any {
        let layout = this.layouts.filter((l) => {
            return l.key === key;
        });
        return layout;
    }
}
