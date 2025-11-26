import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : 'loans',
        loadChildren : () =>
            import('./features/loans/loans.module').then((m) => m.LoansModule),
    },
        {
            path : '',
            redirectTo : 'loans',
            pathMatch : 'full',
        }
];
