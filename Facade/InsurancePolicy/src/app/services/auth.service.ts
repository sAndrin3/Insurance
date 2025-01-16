import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SigninResponse, SignupRequest, UserInfo} from '../../types';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  authUser = signal<UserInfo | null>(null);

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('X-Insurance-User');
    this.authUser.set(user? JSON.parse(user) : null);
  }

  signup(data: SignupRequest){
    return this.http.post(this.baseUrl + '/register', data);
  }

  signin(data: SignupRequest) {
    return this.http.post<SigninResponse>(this.baseUrl + '/login', data).pipe(tap({
      next: response => {
        localStorage.setItem('X-Insurance-Token', JSON.stringify(response))
        this.getUserInfo().subscribe({
          next: response => {
            localStorage.setItem('X-Insurance-User', JSON.stringify(response))
            window.location.reload();
          },
          error: error => {
            this.signout()
          }
        })
      }
    }));
  }

  signout(){
    localStorage.removeItem('X-Insurance-Token');
    localStorage.removeItem('X-Insurance-User');
    window.location.reload();
  }

  getUserInfo(){
    return this.http.get<UserInfo>(this.baseUrl + '/manage/info')
  }
}
