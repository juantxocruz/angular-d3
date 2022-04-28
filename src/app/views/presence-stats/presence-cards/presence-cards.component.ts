import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../presence-card/presence-stats-cards.service';

@Component({
  selector: 'app-presence-cards',
  templateUrl: './presence-cards.component.html',
  styleUrls: ['./presence-cards.component.scss']
})
export class PresenceCardsComponent implements OnInit {

  @Input() cards: Array<Card>;

  constructor() { }

  ngOnInit(): void {
    let x = this.cards;
  }

}
