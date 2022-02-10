import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userRole: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserState()
                    .subscribe((data: any) => {
                      this.userRole = data.role;
                    })
  }

}
