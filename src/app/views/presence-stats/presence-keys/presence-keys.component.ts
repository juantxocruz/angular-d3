import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../presence-card/presence-stats-cards.service';

@Component({
  selector: 'app-presence-keys',
  templateUrl: './presence-keys.component.html',
  styleUrls: ['./presence-keys.component.scss']
})
export class PresenceKeysComponent implements OnInit {
  @Input() cards: Card[];
  numberOfKeys: number = 0
  constructor() { }

  ngOnInit(): void {
    this.numberOfKeys = this.cards.length;
  }

}
