import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "./user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  @Input() result = {
    login: null,
    user: null,
    users: null,
    error: null
  };
  @Input() users = "";
  @Input() token;
  @Input() form = {};
  @Input() login = {};
  constructor(private userService: UserService) {}

  ngOnInit() {}

  sendLogin() {
    if (this.form.login) {
      this.userService.getToken(this.login).subscribe(data => {
        this.result.login = "Success!";
        this.token = data;
        if (data) {
          this.userService.sendLogin(this.token).subscribe(msg => {
            this.result.login = msg;
          });
        }
        this.login = null;
        this.token = null;
        console.log(this.token);
      });
    } else {
      this.result.error = "Login Invalid!";
    }
  }
  onSubmit() {
    console.log(this.form);
    this.userService.submitUser(this.form).subscribe(id => {
      this.result.user = "Success! [ID: " + id + "]";
    });
  }
  listUser() {
    this.userService.listUsers().subscribe(data => {
      this.result.users = "Success!";
      this.users = JSON.stringify(data);
      console.log(this.users);
    });
  }
}
