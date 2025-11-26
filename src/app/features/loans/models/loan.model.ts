export interface Loan {
  id: number;
  borrowerName: string;
  loanAmount: number;
  outstandingPrincipal: number;
  outstandingInterest: number;
  repayments: Repayment[];
}

export interface Repayment {
  amount: number;
  date: string;
  runningBalance: number;
}
