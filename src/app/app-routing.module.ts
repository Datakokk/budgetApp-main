import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SalesGuard } from './guards/sales.guard';
import { UsersGuard } from './guards/users.guard';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './nav/user-profile/user-profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [UsersGuard],
    data: {
      title: 'Usuarios',
      absolutePath: '/users'
    }
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
    canActivate: [SalesGuard],
    data: {
      title: 'Clientes',
      absolutePath: '/customers'
    }
  },
  {
    path: 'budgets',
    loadChildren: () => import('./budgets/budgets.module').then(m => m.BudgetsModule),
    // canActivate: [SalesGuard],
    data: {
      title: 'Dashboard',
      absolutePath: '/budgets'
    }
  },
  {
      path: 'user-profile',
      component: UserProfileComponent,
      data: {
          title: 'Mi cuenta',
          absolutePath: '/user-profile'
      }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
