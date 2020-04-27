import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dashboard-create-file-form',
  templateUrl: 'create-file-form.component.html',
  styleUrls: ['create-file-form.component.scss']
})

export class CreateFileFormComponent {
  nameInput: FormControl;
  constructor(private _bottomSheetRef: MatBottomSheetRef<CreateFileFormComponent>) {
    this.nameInput = new FormControl('', [Validators.required])
  }
  createFile() {
    if (this.nameInput.valid) {
      this._bottomSheetRef.dismiss(this.nameInput.value);
    }
  }
}