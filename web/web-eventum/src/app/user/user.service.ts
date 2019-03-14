import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { text } from '@angular/core/src/render3';

const API = "http://localhost:8080";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  submitUser(form,token) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }),
      responseType: 'text' as 'text'
    };
    return this.http.post(API + "/api/user/novo", form, httpOptions);
  }

  listUsers() {
    return this.http.get(API + "/user/buscar");
  }

  getToken(login) {
    return this.http.post(API + "/login", login, { responseType: "text" });
  }

  sendLogin(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }),
      responseType: 'text' as 'text'
    };
    return this.http.get(API + "/api/login/user", httpOptions);
  }
}
