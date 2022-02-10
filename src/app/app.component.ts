import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading: boolean = false;

  constructor(private router: Router,
              private authService: AuthService) {}
  
  ngOnInit() {
    // if (!localStorage.getItem('token')) {
    //   this.router.navigate(['/login']);
    // } else {
      this.loading = true;
      this.authService.checkToken()
                      .subscribe((res: any) => {
                        this.authService.setUserState(res.user);
                        this.loading = false;
                      }, (err: any) => {
                        this.router.navigate(['/login']);
                        this.loading = false;
                      })
    // }
  }



}
