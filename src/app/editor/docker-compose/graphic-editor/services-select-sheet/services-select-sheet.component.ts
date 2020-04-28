import { Component, Inject } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { IDCService } from '../../services.service';

@Component({
  selector: 'dc-services-select-sheet',
  templateUrl: 'services-select-sheet.component.html',
  styleUrls: ['services-select-sheet.component.scss']
})
export class ServicesSelectSheetComponent {
  services: IDCService[];
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ServicesSelectSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private _data: any
  ) {
    this.services = _data;
  }

  select(id: string) {
    this._bottomSheetRef.dismiss(+id);
  }
}