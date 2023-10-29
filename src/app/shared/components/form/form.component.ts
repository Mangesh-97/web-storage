import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CustomRegex } from '../../const/validators_regexp';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {



  empForm!: FormGroup
  gender: Array<string> = ['Male', 'Female']
  addObj: Subject<any> = new Subject<any>()
  empArray!: any[]

  constructor(
    private _fb: FormBuilder,
    private _matDialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public empObj: any,
    private _matSnackbar: SnackbarService
  ) { }


  ngOnInit(): void {
    this.getLocalStorageData()
    this.createEmpForm()

    this.empForm.get('additionalInfo')?.valueChanges.subscribe(res => {
      if (res) {
        this.empForm.addControl('salary', this._fb.control('', [Validators.required, Validators.pattern(CustomRegex.onlyNumber)]))
        this.empForm.addControl('noticPeriod', this._fb.control('', [Validators.required, Validators.maxLength(2), Validators.pattern(CustomRegex.onlyNumber)]))
      } else {
        this.empForm.removeControl('salary')
        this.empForm.removeControl('noticPeriod')
      }
    })

    if (this.empObj) {
      console.log(this.empObj);
      for (let i = 1; i < this.empObj.email.length; i++) {
        let control = this._fb.control(null)
        this.emailArray.push(control)
      }
      this.empForm.patchValue(this.empObj)
    }
  }

  getLocalStorageData() {
    this.empArray = JSON.parse(localStorage.getItem('array')!) || []
  }

  createEmpForm(): FormGroup {
    return this.empForm = this._fb.group({
      fname: [null, Validators.required],
      lname: [null, Validators.required],
      contact: [null, [Validators.required, Validators.minLength(10), Validators.pattern(CustomRegex.onlyNumber)]],
      email: new FormArray([new FormControl('', [Validators.required, Validators.email])]),
      age: [null, Validators.required],
      gender: [null, Validators.required],
      additionalInfo: [null],
    })
  }

  onSubmitEmpForm() {

    if (this.empForm.valid) {


      if (!this.empObj) {

        // console.log(this.empForm.value);
        let obj = {
          ...this.empForm.value,
          id: this.uuidv4()
        }
        this.empArray.unshift(obj)
        this._matDialogRef.close(true)
        localStorage.setItem('array', JSON.stringify(this.empArray))

        this._matSnackbar.openSnackBar('Employee Added Successfully...!!!')
      } else {


        this.empArray.forEach(e => {
          if (e.id === this.empObj.id) {
            let { fname, lname, email, contact, age, gender, additionalInfo, salary, noticPeriod } = this.empForm.value
            e.fname = fname
            e.lname = lname
            e.email = email
            e.contact = contact
            e.age = age
            e.gender = gender
            e.additionalInfo = additionalInfo
            e.salary = salary ? salary : ''
            e.noticPeriod = noticPeriod ? noticPeriod : ''
          }
        })
        localStorage.setItem('array', JSON.stringify(this.empArray))
        this._matDialogRef.close(true)
        this._matSnackbar.openSnackBar('Employee Information Updtated Successfully...!!!')
      }
    } else {
      this.empForm.markAllAsTouched()
    }


  }

  onAddEmail() {
    this.emailArray.controls
    if (this.emailArray.length <= 4) {
      const control = this._fb.control('')
      this.emailArray.push(control)
    }
  }

  removeEmail(i: any) {
    this.emailArray.removeAt(i)
  }


  onReset(i: any) {
    this.emailArray.controls[i].reset()
  }

  get emailArray() {
    return (this.empForm.get('email') as FormArray)
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }
}
