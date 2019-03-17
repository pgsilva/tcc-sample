import { UserService } from "./../user/user.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";

import { LoginForm } from "../models/forms";
import { LoginService } from "./login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Input() result = {
    login: null,
    error: null
  };

  @Input() token = "";
  form: FormGroup;
  private login: LoginForm = new LoginForm();

  constructor(private loginService: LoginService) {
    this.form = this.createFormGroup();
  }

  ngOnInit() {}

  createFormGroup() {
    return new FormGroup({
      loginForm: new FormGroup({
        user: new FormControl(),
        pass: new FormControl()
      })
    });
  }

  getToken() {
    this.login = new LoginForm(this.form.get("loginForm").value);
    console.warn(this.login);
    if (this.login.user != null) {
      this.loginService.getToken(this.login).subscribe(data => {
        if (data) {
          console.log(data);
          this.sendLogin();
        }
      });
    }else {
      this.result.error = "Login Invalid";
    }
  }
  sendLogin() {
    this.loginService.sendLogin().subscribe(data => {
      console.log(data);
      this.login = null;
    });
  }

  logout() {
    this.loginService.logout();
  }
}
