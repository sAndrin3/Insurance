import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormValidationService} from '../../utils/form-validation.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  submitted = false;
  form: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private formValidationService : FormValidationService, private toastr: ToastrService) {
    if(this.authService.authUser()) this.router.navigate(['/']);
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.authService.signin(this.form.value).subscribe({
        next: response => {
          console.log("Signin successful");
        },
        error: error => {
          console.log(error);
          if(error.status === 401){
            this.toastr.error('Wrong Credentials');
          }
        }
      })
    }
    else{
      console.log("error", this.form)
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.form.get(controlName);
    return this.formValidationService.getErrorMessage(control, controlName);
  }


  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!((control?.touched || this.submitted) && control?.invalid);
  }
}
