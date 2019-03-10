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

}
