import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'editor-delete-file-confirm',
  templateUrl: 'delete-file-confirm.component.html',
  styleUrls: ['delete-file-confirm.component.scss']
})

export class DeleteFileConfirmComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<DeleteFileConfirmComponent>) { }
  
  confirm() {
    this._bottomSheetRef.dismiss(true);
  }

  refuse() {
    this._bottomSheetRef.dismiss(false);
  }
  
}