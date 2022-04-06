import { Injectable } from "@angular/core";
import * as d3 from "d3";

@Injectable({ providedIn: "root" })
export class DefaultVarsService {
    public default_time: number = 1200;
    public resize_delay: number = 800; // timeOut delay
    public opacity_lowest: number = 0.2;
}
