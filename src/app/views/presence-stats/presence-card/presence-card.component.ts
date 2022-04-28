import { Component, OnInit, Input } from '@angular/core';
import { Card } from './presence-stats-cards.service';

@Component({
  selector: 'app-presence-card',
  templateUrl: './presence-card.component.html',
  styleUrls: ['./presence-card.component.scss']
})
export class PresenceCardComponent implements OnInit {

  @Input() card: Card = {
    color: "#E74C3C",
    title: "Aldi",
    address: "Paseo de la Infanta Isabel 21",
    presence: 22580,
    income: "15000-inf",
    gender: "Mujer",
    age: "45-65",
    nationalty: "España",
    period: "14:00-20:59",
    activity: "Tránsito",
    transit: 22580
  }
  color: string;


  constructor() { }

  ngOnInit(): void {
    this.color = this.card.color;
  }

}
