import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Policy, ResourceResponse} from '../../types';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<ResourceResponse<Policy[]>>(`${this.baseUrl}/api/policy`)
  }
}
