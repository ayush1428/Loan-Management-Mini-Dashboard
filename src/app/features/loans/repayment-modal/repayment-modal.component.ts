import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Loan } from '../models/loan.model';

@Component({
  selector: 'app-repayment-modal',
  templateUrl: './repayment-modal.component.html',
  styleUrls: ['./repayment-modal.component.scss']
})
export class RepaymentModalComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RepaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public loan: Loan
  ) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      date: ['', [Validators.required, this.dateValidator]]   // validator applied here
    });
  }

  // Custom validator as arrow function (keeps "this" context)
  dateValidator = (control: any) => {
    const value = control.value;

    if (!value) return { required: true };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(value);
    selected.setHours(0, 0, 0, 0);

    if (selected > today) {
      return { futureDate: true };
    }

    return null;
  };

  // Allows only digits in amount
  digitsOnly(event: any) {
    const cleaned = event.target.value.replace(/[^0-9]/g, '');
    this.form.controls['amount'].setValue(cleaned);
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }
}
