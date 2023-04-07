import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseURL: string = 'http://localhost:3000/registration';

  constructor(private http: HttpClient) {}

  //POST THE USER
  postRegistrationUser(registerObj: User) {
    return this.http.post<User>(`${this.baseURL}`, registerObj);
  }

  //GET THE USER
  getRegistrationUser() {
    return this.http.get<User[]>(`${this.baseURL}`);
  }

  //UPDATE USER
  updateRegistrationUser(registerObj: User, id: number) {
    return this.http.put<User>(`${this.baseURL}/${id}`, registerObj);
  }

  //DELETE USER
  deleteRegistrationUser(id: number) {
    return this.http.delete<User>(`${this.baseURL}/${id}`);
  }

  //GET USER ID
  GetRegistrationUserId(id: number) {
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }
}
