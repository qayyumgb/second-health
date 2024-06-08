import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'flight-settings',
  encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  templateUrl: './flight-settings.component.html',
  styleUrl: './flight-settings.component.scss'
})
export class FlightSettingsComponent {

}
