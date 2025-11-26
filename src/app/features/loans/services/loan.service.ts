import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable , of , delay} from 'rxjs';
import { Loan } from '../models/loan.model';
import { mockLoans } from '../mock/mock-loans';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  // Stores the full loan list, starts with mock data
  private loansSubject = new BehaviorSubject<Loan[]>(mockLoans);

  // Observable for components to listen to loan list changes
  loans$ = this.loansSubject.asObservable();


  // Stores the selected loan (for /loans/:id page)
  private selectedLoanSubject = new BehaviorSubject<Loan | null>(null);

  // Observable for detail component
  selectedLoan$ = this.selectedLoanSubject.asObservable();


  constructor() {}

  // Get full loan list as observable
  getLoans(): Observable<Loan[]> {
  return this.loans$.pipe(delay(300));
}

  // Load single loan based on id (loan detail page)
  getLoanById(id: number) {
    const found = this.loansSubject.getValue().find(l => l.id === id) || null;
    this.selectedLoanSubject.next(found);
  }

}
