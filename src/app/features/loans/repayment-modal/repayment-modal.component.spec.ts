import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentModalComponent } from './repayment-modal.component';

describe('RepaymentModalComponent', () => {
  let component: RepaymentModalComponent;
  let fixture: ComponentFixture<RepaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepaymentModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
