import { Component, Input } from '@angular/core';
import { IKeyValue } from 'src/app/sets-service/sets.service';
import { Form } from 'src/app/Parser/FormGroupParser/form-group-parser.service';

@Component({
  selector: 'app-add-button',
  templateUrl: 'add-button.component.html',
  styleUrls: ['add-button.component.scss']
})
export class AddButtonComponent {
  @Input() control: IKeyValue<Form>;

  add() {
    console.log(this.control);
  }
}
