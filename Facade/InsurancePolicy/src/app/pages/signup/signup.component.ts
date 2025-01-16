import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    if(this.authService.authUser()) this.router.navigate(['/']);
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] // Todo: Add other password validators RegEx
    })
  }

  submit(){
    if(this.form.valid){
      this.authService.signup(this.form.value).subscribe({
        next: response => {
          console.log("Signup successful");
        },
        error: error => {
          console.log(error);
        }
      })
    }
    else{
      console.log("error", this.form)
    }
  }
}
