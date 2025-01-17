import {Component, effect, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PolicyService} from '../../services/policy.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {Policy} from '../../../types';

@Component({
  selector: 'app-policy-form',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './policy-form.component.html',
  styleUrl: './policy-form.component.css'
})
export class PolicyFormComponent implements OnInit {
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

  constructor(private fb: FormBuilder, private policyService: PolicyService, private route: ActivatedRoute) {
    this.form = this.fb.group({
      policyNumber: ['', [Validators.required]],
      policyholderName: ['', [Validators.required]],
      policyholderEmail: ['', [Validators.required, Validators.email]],
      policyholderPhone: ['',[Validators.required]],
      startDate: ['',[Validators.required]],
      endDate: ['',[Validators.required]],
      premiumAmount: ['', [Validators.required]],
      coverageAmount: ['', [Validators.required]],
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
    if(this.form.valid){
      const data = {...this.form.value, startDate: new Date(this.form.value.startDate).toISOString(), endDate: new Date(this.form.value.endDate).toISOString(), id: this.id()};
      this.onSubmit.emit(data)
    }
    else{
      console.log("error", this.form)
    }
  }
}
