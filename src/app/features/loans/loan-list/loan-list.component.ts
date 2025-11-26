import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Loan } from '../models/loan.model';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '../services/loan.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'borrowerName',
    'loanAmount',
    'outstandingPrincipal',
    'outstandingInterest'
  ];

  fullList : Loan[] = [];

  dataSource = new MatTableDataSource<Loan>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private loanService: LoanService,
    private router: Router,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to loan list data
    this.loanService.getLoans().subscribe(loans => {
      this.fullList = loans;
      this.dataSource.data = loans;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //  CUSTOM FILTER + SORT + PRESERVE PAGE
  applyFilter(event: Event): void {
  const input = (event.target as HTMLInputElement).value.trim().toLowerCase();
  

  if (!input) {
    this.dataSource.data = [...this.fullList];
    this.dataSource.paginator = this.paginator;
    return;
  }

  // Extract FIRST name only
  let filtered = this.fullList.filter(loan => {
    const firstName = loan.borrowerName.split(" ")[0].toLowerCase();
    return firstName.startsWith(input);
  });

  // Sort alphabetically
  filtered = filtered.sort((a, b) =>
    a.borrowerName.localeCompare(b.borrowerName)
  );

  this.dataSource.data = filtered;
  this.dataSource.paginator = this.paginator;
}


  openLoanDetail(id: number): void {
    this.router.navigate(['/loans', id], {
    });
  }
}
