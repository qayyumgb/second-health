import { TextFieldModule } from '@angular/cdk/text-field';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-script-details',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatButtonModule, TextFieldModule, MatInputModule],
  templateUrl: './script-details.component.html',
  styleUrl: './script-details.component.scss'
})
export class ScriptDetailsComponent {

}
