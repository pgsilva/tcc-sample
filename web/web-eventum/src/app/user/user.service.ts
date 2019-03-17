import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

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
        "Authorization": "Bearer " + this.token
      }),
      responseType: "text" as "text"
    };
    return this.http.post(API + "/api/user/novo", form, httpOptions);
  }

  listUsers() {
    return this.http.get(API + "/user/buscar");
  }

  getToken(login) {
    return this.http.post(API + "/login", login, { responseType: "text" }).pipe(
      map(token =>{
        if(token){
          // armazenar detalhes do usuário e token jwt no localStorage para manter o usuário logado entre as atualizações da página
          localStorage.setItem('currentUser', token);
        }
        return token;
      })
    );
  }

  sendLogin() {
    this.token = localStorage.getItem("currentUser");
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.token
      }),
      responseType: "text" as "text"
    };
    return this.http.get(API + "/api/login/user", httpOptions);
  }

  sendMessage(message) {
    return this.http.post(API_CHAT + "/msg", message);
  }

  logout(): void {
    // Limpa o token removendo o usuário do local store para  @Input() token = "";efetuar o logout
    this.token = null;
    localStorage.removeItem('currentUser');
    console.log(localStorage.getItem("currentUser"))
  }

}
