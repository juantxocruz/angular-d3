import { Injectable } from "@angular/core";

@Injectable()
export class MeasureService {
    public switchMeasure = (word: string): string => {
        let measure: string = "";

        switch (word) {
            case "Volumen":
            case "Áreas":
            case "Media":
            case "Fecha":
            case "Euros":
                {
                    measure = "val";
                }
                break;

            case "Indice":
            case "Porcentaje":
                {
                    measure = "perf";
                }
                break;

            default:
                {
                    measure = "";
                }
                break;
        }
        return measure;
    };
}
