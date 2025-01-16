import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-welcome',
  imports: [
    RouterLink
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  constructor(private authService: AuthService, private router: Router) {
    if(this.authService.authUser()) this.router.navigate(['/dashboard']);
  }
}
