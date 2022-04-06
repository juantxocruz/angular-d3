import { Injectable } from "@angular/core";
import { ColorsService } from "./colors.service";

export interface ToolStyleCard {
    font_size: string;
    background_color: string;
    padding: string;
    position: string;
    z_index: number;
    font_weight: string;
    text_anchor: string;
    fill_text: string;
    opacity_lowest: number;
    high_opacity: number;
}
@Injectable()
export class TooltipStyleService {
    constructor(private colorsService: ColorsService) { }
    colors = this.colorsService.colors;

    public tooltipValues: ToolStyleCard = {
        font_size: "12px",
        background_color: this.colors.white,
        padding: "8px",
        position: "absolute",
        z_index: 99999,
        font_weight: "bold",
        text_anchor: "middle",
        fill_text: this.colors.black,
        opacity_lowest: 0.5,
        high_opacity: 1,
    };
}
