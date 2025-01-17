import {Component, computed} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PolicyService} from '../../services/policy.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    DatePipe,
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  authUser
  showConfirmDialog: boolean = false;
  policyIdToDelete: string | null = null;
  selectedPolicyType: string = '';
  emailSearchTerm: string = '';

  policiesResource = rxResource({
    loader: () => this.policyService.getAll()
  })
  policies = computed(() => this.policiesResource.value()?.result)

  constructor(private authService: AuthService, private policyService: PolicyService, private toastr: ToastrService) {
    this.authUser = this.authService.authUser;
  }

  signout(){
    this.authService.signout()
    this.toastr.success('Logged Out');
  }

  openDeleteModal(policyId: string): void {
    this.policyIdToDelete = policyId;
    this.showConfirmDialog = true;
  }

  closeConfirmDialog(confirmed: boolean): void {
    if (confirmed && this.policyIdToDelete) {
      this.deletePolicy(this.policyIdToDelete);
      this.toastr.success('Policy Deleted Successfully');
    }
    this.showConfirmDialog = false;
    this.policyIdToDelete = null;
  }

  deletePolicy(id: string){
    this.policyService.delete(id).subscribe({
      next: () => {
        this.policiesResource.reload()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  filteredPolicies() {
    const policiesList = this.policies();
    if (!policiesList) {
      return [];
    }

    let filtered = policiesList;
    if (this.selectedPolicyType) {
      filtered= filtered.filter(policy => policy.policyType === this.selectedPolicyType);
    }

    if(this.emailSearchTerm){
      filtered = filtered.filter(policy => policy.policyholderEmail.toLowerCase().includes(this.emailSearchTerm.toLowerCase()))
    }
    return filtered;
  }

}
