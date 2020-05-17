import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material';

@Injectable({providedIn: 'root'})
export class ErrorsService {
  constructor(private _snackBar: MatSnackBar) {}

  showError(text: string) {
    this._snackBar.open(text, null, {
      duration: 3000,
      politeness: 'assertive'
    })
  }
}
