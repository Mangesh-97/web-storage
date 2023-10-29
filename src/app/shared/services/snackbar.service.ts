import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _matSnackBar: MatSnackBar
  ) { }

  openSnackBar(msg: string, time = 3000) {
    return this._matSnackBar.open(msg, "Close", {
      horizontalPosition: "start",
      verticalPosition: 'top',
      duration: time
    })
  }
}
