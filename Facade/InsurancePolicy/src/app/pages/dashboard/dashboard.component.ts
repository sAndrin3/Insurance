import {Component, computed} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PolicyService} from '../../services/policy.service';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  authUser

  policiesResource = rxResource({
    loader: () => this.policyService.getAll()
  })
  policies = computed(() => this.policiesResource.value()?.result)

  constructor(private authService: AuthService, private policyService: PolicyService) {
    this.authUser = this.authService.authUser;
  }

  signout(){
    this.authService.signout()
  }
}
