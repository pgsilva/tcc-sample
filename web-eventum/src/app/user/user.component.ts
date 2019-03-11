import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "./user.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  @Input() result = {
    users: ""
  };
  @Input() users = "";

  constructor(private userService: UserService) {}

  ngOnInit() {}

  listUser() {
    this.userService.listUsers().subscribe(data => {
      this.result.users = "Success!";
      this.users = JSON.stringify(data);
      console.log(this.users);
    });
  }
}
