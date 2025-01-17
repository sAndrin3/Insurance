import { Component } from '@angular/core';
import {PolicyFormComponent} from '../../../components/policy-form/policy-form.component';
import {PolicyService} from '../../../services/policy.service';
import {Policy} from '../../../../types';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-new-policy',
  imports: [
    PolicyFormComponent
  ],
  templateUrl: './new-policy.component.html',
  styleUrl: './new-policy.component.css'
})
export class NewPolicyComponent {
  constructor(private policyService: PolicyService, private router: Router, private toastr: ToastrService) {
  }

  submit(policy: Policy ){
      this.policyService.create(policy).subscribe({
        next:response => {
          this.toastr.success('Policy Created Successfully');
          this.router.navigate(['/']);
        },
        error: error => {
          console.log(error);
        }
      })
  }
}

