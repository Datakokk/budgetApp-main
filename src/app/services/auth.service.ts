import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authEndpoint: string = environment.URLAPIserver + 'auth/';

  private userState = {
    _id: '',
    name: '',
    role: '',
    avatarFileName: ''
  }

  private userStateSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.userState);

  getUserState(): Observable<any> {
    return this.userStateSubject.asObservable();
  }

  setUserState(userState: any): void {
    this.userState = userState;
    this.userStateSubject.next(this.userState);
  }

  setUserStateAvatar(avatarFileName: string) {
      this.userState.avatarFileName = avatarFileName;
      this.userStateSubject.next(this.userState);
  }

  private sendingSubject: BehaviorSubject<any> = new BehaviorSubject<any>({sending: false});

  getSending(): Observable<any> {
      return this.sendingSubject.asObservable();
  }

  setSending(sending: boolean): void {
      this.sendingSubject.next({sending: sending});
  }

  constructor(private http: HttpClient,
              private router: Router) { }

  signUp(user: User) {
    return this.http.post(this.authEndpoint + 'signup', user)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )
  }

  logIn(credentials) {
    return this.http.post(this.authEndpoint + 'login', credentials)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )
  }

  checkToken() {
    // const token = localStorage.getItem('token');
    // const options = {
    //   headers: { authorization: token}
    // }
    // return this.http.get(this.authEndpoint + 'checktoken', options)
    return this.http.get(this.authEndpoint + 'checktoken')
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )
  }

  logOut() {
    return this.http.get(this.authEndpoint + 'logout')
                    .subscribe((res: any) => {
                      console.log(res);
                      this.setUserState({
                        _id: '',
                        name: '',
                        role: '',
                        avatarFileName: ''
                      })
                      this.router.navigate(['/login']);
                    }, (err: any) => {
                      console.log(err);
                    })
  }


}
