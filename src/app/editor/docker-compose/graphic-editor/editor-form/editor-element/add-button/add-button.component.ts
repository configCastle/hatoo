import { Component, Input } from "@angular/core";
import { Form } from 'src/app/Parser/FormGroupParser/form-group-parser.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-button',
  templateUrl: 'add-button.component.html',
  styleUrls: ['add-button.component.scss']
})
export class AddButtonComponent {
  @Input() control: Form;

  add() {
    if (this.control instanceof FormArray) {
      this.control.push(new FormControl(''));
    } else if (this.control instanceof FormGroup) {
      // Короче. Надо думать над ткм, как будет редактироваться ключ 
      // this.control.addControl()
    }
  }
}
