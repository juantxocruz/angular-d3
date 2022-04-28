import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../presence-card/presence-stats-cards.service';

@Component({
  selector: 'app-presence-cards',
  templateUrl: './presence-cards.component.html',
  styleUrls: ['./presence-cards.component.scss']
})
export class PresenceCardsComponent implements OnInit {

  // ERROR Error: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'undefined'. Current value: 
  // WHY???? To study
  @Input() cards: Card[];

  constructor() { }

  ngOnInit(): void {
    let x = this.cards;
  }

}
