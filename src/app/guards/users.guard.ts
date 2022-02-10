import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {

  userRole: string;

  constructor(private authService: AuthService,
              private router: Router) {
                this.authService.getUserState()
                                .subscribe((data: any) => {
                                  this.userRole = data.role;
                                })
  }

  canActivate() {
    if(this.userRole === 'admin') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
