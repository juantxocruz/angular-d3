import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PresenceFormService } from './presence-form.service';


@Component({
  selector: 'app-presence-form',
  templateUrl: './presence-form.component.html',
  styleUrls: ['./presence-form.component.scss']
})
export class PresenceFormComponent implements OnInit {
  @Input() options: any[];
  form: FormGroup;
  message: string = '';

  constructor(private presenceFormService: PresenceFormService) {

    this.form = new FormGroup({
      pois: new FormControl([])
    });

    this.form.valueChanges.subscribe((f) => {
      this.presenceFormService.setForm(this.form.value);
    });

    this.form.controls.pois.valueChanges.subscribe((v) => {
      if (v.length >= 6) {
        this.form.controls.pois.setValue(v.slice(0, 6), { emitEvent: false });
        return false;
      }
    });

  }

  ngOnInit(): void {
    const selection = [
      this.options[0].properties.id,
      this.options[1].properties.id,
      this.options[2].properties.id,
      this.options[3].properties.id,
      this.options[4].properties.id,
      this.options[5].properties.id,
    ];
    this.form.controls.pois.setValue(selection);
    this.presenceFormService.setForm(this.form.value);

  }

}
