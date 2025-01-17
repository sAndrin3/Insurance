import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {FormValidationService} from '../../utils/form-validation.service';
import {NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  submitted = false;
  form: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private formValidationService : FormValidationService, private toastr: ToastrService) {
    if(this.authService.authUser()) this.router.navigate(['/']);
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)]]
    })
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.authService.signup(this.form.value).subscribe({
        next: response => {
          console.log("Signup successful");
          this.toastr.success('Signup Successfully');
          this.router.navigate(['/signin']);
        },
        error: error =>{
          this.toastr.error(error?.error?.errors?.DuplicateUserName ? 'Profile already exists' : 'An error occurred');
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
