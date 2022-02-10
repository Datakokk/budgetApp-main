import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  showValidation: boolean = false;
  validationMessages: Array<string> = [];

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)]),
      checkPassword: new FormControl('', [Validators.required]),
    })
    this.form.valueChanges.subscribe((data: any) => {
      if(this.showValidation) {
        this.setValidation();
      }
    })
  }

  signUp() {
    const user: User = {
      name: this.form.get('name').value,
      surname: this.form.get('surname').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    }
    this.authService.signUp(user)
                    .subscribe((res: any) => {
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
    if(this.form.get('name').errors?.required) {
      this.validationMessages.push("El nombre es obligatorio");
    }
    if(this.form.get('surname').errors?.required) {
      this.validationMessages.push("Los apellidos son obligatorios");
    }
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
    if(this.form.get('password').value !== this.form.get('checkPassword').value) {
      this.validationMessages.push("Las contraseñas no coinciden");
    }
    this.showValidation = true;
  }

}
