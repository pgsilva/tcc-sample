import { UserService } from "./../user/user.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";
import { environment } from "../../environments/environment";

import { LoginForm } from "../models/forms";

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

  constructor(private userService: UserService) {
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

  sendLogin() {
    this.login = new LoginForm(this.form.get("loginForm").value);
    console.warn(this.login);

    if (this.login.user != null) {
      this.userService.getToken(this.login).subscribe(data => {
        this.token = data;
        this.userService.sendLogin(this.token).subscribe(data => {
          this.result.login = data;
          environment.token_session = this.token;
          console.warn(environment.token_session);
          this.token = null;
          this.login = null;
        });
      });
    } else {
      this.result.error = "Login Invalid";
    }
  }
}
