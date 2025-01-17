import {Component, effect, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PolicyService} from '../../services/policy.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {Policy} from '../../../types';
import {NgClass, NgIf} from '@angular/common';
import {FormValidationService} from '../../utils/form-validation.service';

@Component({
  selector: 'app-policy-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgClass
  ],
  templateUrl: './policy-form.component.html',
  styleUrl: './policy-form.component.css'
})
export class PolicyFormComponent implements OnInit {
  submitted = false;
  onSubmit = output<Policy>()
  form: FormGroup;
  id = signal<string | null>(null);
  policyResource = rxResource({
    request: () => this.id(),
    loader: ({request}) => {
      if(request){
        return this.policyService.get(request)
      }
      return of(null);
    }
  })


  constructor(private fb: FormBuilder, private policyService: PolicyService, private route: ActivatedRoute, private formValidationService: FormValidationService) {
    this.form = this.fb.group({
      policyNumber: ['', [Validators.required, Validators.pattern('^^[0-9]*$')]],
      policyholderName: ['', [Validators.required, Validators.minLength(3)]],
      policyholderEmail: ['', [Validators.required, Validators.email]],
      policyholderPhone: ['',[Validators.required, Validators.pattern('^[0-9]*$')]],
      startDate: ['',[Validators.required]],
      endDate: ['',[Validators.required]],
      premiumAmount: ['', [Validators.required, Validators.min(1)]],
      coverageAmount: ['', [Validators.required, Validators.min(1)]],
      policyType: ['',[Validators.required]],
    })
    effect(() => {
      const policyResponse = this.policyResource.value()
      if(policyResponse){
        this.form.patchValue({...policyResponse.result, startDate: new Date(policyResponse.result.startDate).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-'), endDate: new Date(policyResponse.result.endDate).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-')});
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.id.set(paramMap.get('id'));
    })
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      const data = {...this.form.value, startDate: new Date(this.form.value.startDate).toISOString(), endDate: new Date(this.form.value.endDate).toISOString(), id: this.id()};
      this.onSubmit.emit(data)
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
