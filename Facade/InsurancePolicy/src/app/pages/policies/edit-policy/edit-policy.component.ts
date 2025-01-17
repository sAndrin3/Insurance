import { Component } from '@angular/core';
import {PolicyFormComponent} from '../../../components/policy-form/policy-form.component';
import {PolicyService} from '../../../services/policy.service';
import {Policy} from '../../../../types';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-policy',
  imports: [
    PolicyFormComponent
  ],
  templateUrl: './edit-policy.component.html',
  styleUrl: './edit-policy.component.css'
})
export class EditPolicyComponent {
  constructor(private policyService: PolicyService, private router: Router, private toastr: ToastrService) {
  }

  submit(policy: Policy ){
    this.policyService.update(policy).subscribe({
      next:response => {
        this.toastr.success('Policy Updated Successfully');
        this.router.navigate(['/']);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
