import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  showValidation: boolean = false;
  validationMessages: Array<string> = [];

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)]),
    })
    this.form.valueChanges.subscribe((data: any) => {
      if(this.showValidation) {
        this.setValidation();
      }
    })
  }

  logIn() {
    const credentials = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    }
    this.authService.logIn(credentials)
                    .subscribe((res: any) => {
                      // localStorage.setItem('token', res.token);
                      this.authService.setUserState(res.userState);
                      this.router.navigate(['/']);
                    }, (err: any) => {
                      this.validationMessages = [];
                      this.showValidation = true;
                      if(err.error?.message) {
                        this.validationMessages.push(err.error.message);
                      } else {
                        this.validationMessages.push('El servidor no se encuentra disponible, inténtelo de nuevo más tarde');
                      }
                    }) 
  }

  setValidation() {
    this.validationMessages = [];
    if(this.form.get('email').errors?.required) {
      this.validationMessages.push("El correo electrónico es obligatorio");
    }
    if(this.form.get('email').errors?.pattern) {
      this.validationMessages.push("El correo electrónico no es correcto");
    }
    if(this.form.get('password').errors?.required) {
      this.validationMessages.push("La contraseña es obligatoria");
    }
    if(this.form.get('password').errors?.pattern) {
      this.validationMessages.push("La contraseña debe tener al menos una minúscula, una mayúscula y un número");
    }
    this.showValidation = true;
  }


}
