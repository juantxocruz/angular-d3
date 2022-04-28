import { Component, OnInit, Input } from '@angular/core';
import { Card } from './presence-stats-cards.service';

@Component({
  selector: 'app-presence-card',
  templateUrl: './presence-card.component.html',
  styleUrls: ['./presence-card.component.scss']
})
export class PresenceCardComponent implements OnInit {

  @Input() card: Card;
  color: string;


  constructor() { }

  ngOnInit(): void {
    this.color = this.card.color;
  }

}
