import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  form: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    if(this.authService.authUser()) this.router.navigate(['/']);
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  submit(){
    if(this.form.valid){
      this.authService.signin(this.form.value).subscribe({
        next: response => {
          console.log("Signin successful");
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
