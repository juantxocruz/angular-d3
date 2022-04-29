import { Injectable } from "@angular/core";

@Injectable()
export class AxisTitleService {
    public switchTitle = (word: string): string => {
        let title: string;

        switch (word) {
            case "Volumen":
                {
                    title = "Número";
                }
                break;
            case "visitas":
                {
                    title = "Ratio de visitas";
                }
                break;
            case "Euros":
                {
                    title = "En euros";
                }
                break;
            case "Fecha":
                {
                    title = "Año";
                }
                break;
            case "Indice":
            case "Porcentaje":
                {
                    title = "En %";
                }
                break;
            case "Media":
                {
                    title = "Media";
                }
                break;
            case "Áreas":
                {
                    title = "Áreas";
                }
                break;
            case "horas":
                {
                    title = "Horas";
                }
                break;

            default:
                {
                    title = "";
                }
                break;
        }
        return title;
    };
}
