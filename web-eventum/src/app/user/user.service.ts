import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {RequestOptions, Request, RequestMethod} from '@angular/http';

const API = "http://localhost:8080";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  submitUser(form) {
    return this.http.post(API + "/user/novo", form);
  }

  listUsers() {
    return this.http.get(API + "/user/buscar");
  }

  login(login) {
    const token: string = this.getToken(login);

    const head = new Headers();
    head.append("Content-Type", "application/json");
    head.append("authentication", token);

    let options = new RequestOptions({ headers: head });

    return this.http.get(API + "/api/login/user", options);
  }

  getToken(login) {
    this.http.post(API + "/login", login.user).subscribe(data => {
      return data;
    });
    return null;
  }
}
