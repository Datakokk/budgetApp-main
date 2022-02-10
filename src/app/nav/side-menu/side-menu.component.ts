import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @ViewChild('aside') asideRef: ElementRef;
  userRole: any;

  constructor(private router: Router,
              private authService: AuthService) { }
    
  ngOnInit(): void {
    this.authService.getUserState()
                    .subscribe((data: any) => {
                      this.userRole = data.role;
                    })
  }

  toggleAsideMenu(): void {
    this.asideRef.nativeElement.classList.toggle('open');
  }

  navTo(path: string): void {
    if(this.asideRef.nativeElement.classList.contains('open')) {
      this.asideRef.nativeElement.classList.remove('open');
    }
    this.router.navigate([path]);
  }

}
