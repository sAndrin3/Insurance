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

  get(id: string){
    return this.http.get<ResourceResponse<Policy>>(`${this.baseUrl}/api/policy/${id}`)
  }

  create(policy:Policy){
    return this.http.post<ResourceResponse<Policy>>(`${this.baseUrl}/api/policy`, policy)
  }

  update(policy:Policy){
    return this.http.put<ResourceResponse<Policy>>(`${this.baseUrl}/api/policy/${policy.id}`, policy)
  }

  delete(id: string){
    return this.http.delete(`${this.baseUrl}/api/policy/${id}`)
  }
}
