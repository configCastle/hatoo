import { Component } from '@angular/core';
import { DataService } from './date-service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _data: DataService) {
  }
}
