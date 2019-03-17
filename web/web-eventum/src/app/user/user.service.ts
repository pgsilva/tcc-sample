import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const API = "http://localhost:8080";
const API_CHAT = "http://localhost:3000/morales/chat";


@Injectable({
  providedIn: "root"
})
export class UserService {
  public token: string;

  constructor(private http: HttpClient) {
  }

  submitUser(form) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("currentUser")
      }),
      responseType: "text" as "text"
    };
    return this.http.post(API + "/api/user/novo", form, httpOptions);
  }

  listUsers() {
    return this.http.get(API + "/user/buscar");
  }

  sendMessage(message) {
    return this.http.post(API_CHAT + "/msg", message);
  }

}
