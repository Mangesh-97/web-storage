import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FormComponent } from './shared/components/form/form.component';
import { DeleteConfirmComponent } from './shared/components/delete-confirm/delete-confirm.component';
import { SnackbarService } from './shared/services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular';
  searchVal!: string
  empArray!: any[]
  constructor(
    private _matDialog: MatDialog,
    private _snackBarService: SnackbarService
  ) { }




  ngOnInit(): void {
    this.getLocalStorageData()
  }

  getLocalStorageData() {
    this.empArray = JSON.parse(localStorage.getItem('array')!) || []
  }

  onAddEmp() {
    this._matDialog.open(FormComponent).afterClosed()
      .subscribe(res => {
        if (res) this.getLocalStorageData()
      })
  }


  onEdit(obj: any) {
    const matDialogConfig = new MatDialogConfig
    matDialogConfig.data = obj;
    matDialogConfig.disableClose = true;
    this._matDialog.open(FormComponent, matDialogConfig).afterClosed()
      .subscribe(res => {
        if (res) {
          this.getLocalStorageData()
        }
      })
  }



  onDelete(index: number) {

    this._matDialog.open(DeleteConfirmComponent).afterClosed()
      .subscribe(res => {
        if (res) {

          this.empArray = this.empArray.filter((e, i) => i !== index)
          localStorage.setItem('array', JSON.stringify(this.empArray))
          this._snackBarService.openSnackBar('Employee Data Deleted....!!!')
        }
      })
  }


















}
