import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";

var result = {
  login: "result server",
  user: "result server",
  users: "result server"
};
var users = [];

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {

  }

  ngOnInit() {}

  listUser() {
    this.userService.listUsers().subscribe(data => {
      result.users = "Success!";
      users = data;
    });
  }
}
