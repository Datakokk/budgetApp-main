import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  user: any;
  imageSrc: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
      this.authService.getUserState()
                      .subscribe(data => {
                          this.user = data;
                          this.imageSrc = environment.URLAPIserver + 'avatars/' + data.avatarFileName;
                      })
  }

  logOut() {
    this.authService.logOut()
  }

}
