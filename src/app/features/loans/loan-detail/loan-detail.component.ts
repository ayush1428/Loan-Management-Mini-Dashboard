import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { LoanService } from '../services/loan.service';
import { Loan, Repayment } from '../models/loan.model';
import { MatDialog } from '@angular/material/dialog';
import { RepaymentModalComponent } from '../repayment-modal/repayment-modal.component';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.scss']
})
export class LoanDetailComponent implements OnInit {

   loan!: Loan;  
  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private loanService: LoanService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
    // Get the ID from the URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loanService.getLoanById(id);

    // Subscribe to selected loan from service
    this.loanService.selectedLoan$.subscribe(loan => {
      this.loan = loan!;
    })
  }

  addRepayment(newRepayment: any) {

  // Calculate new running balance
  const lastBalance =
    this.loan.repayments.length > 0
      ? this.loan.repayments[this.loan.repayments.length - 1].runningBalance
      : this.loan.outstandingPrincipal + this.loan.outstandingInterest;

  const updatedBalance = lastBalance - newRepayment.amount;

  // Push repayment
  this.loan.repayments.push({
    amount: newRepayment.amount,
    date: newRepayment.date,
    runningBalance: updatedBalance
  });

  // Update outstanding values
  if (this.loan.outstandingInterest > 0) {
    const interestDeduct = Math.min(this.loan.outstandingInterest, newRepayment.amount);
    this.loan.outstandingInterest -= interestDeduct;
    this.loan.outstandingPrincipal -= (newRepayment.amount - interestDeduct);
  } else {
    this.loan.outstandingPrincipal -= newRepayment.amount;
  }
}


  openRepaymentModal() {
  const dialogRef = this.dialog.open(RepaymentModalComponent, {
    width: '400px',
    panelClass: 'repayment-dialog',
    data: this.loan
  });

  dialogRef.afterClosed().subscribe(result => {
    if (!result) return;
    
    // result contains: { amount: X, date: Y }
    this.addRepayment(result);
  });

  
}

  goBack() {
  this.router.navigate(['/loans'], {
  });
}


}
