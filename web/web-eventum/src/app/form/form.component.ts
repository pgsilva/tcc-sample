import { UserService } from "./../user/user.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";

import { UserForm } from "../models/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  @Input() result = {
    login: null,
    error: null
  };
  @Input() token = "";

  form: FormGroup;
  private user: UserForm = new UserForm();

  constructor(private userService: UserService) {
    this.form = this.createFormGroup();
  }
  ngOnInit() {}

  createFormGroup() {
    return new FormGroup({
      userForm: new FormGroup({
        name: new FormControl(),
        age: new FormControl(),
        mail: new FormControl()
      })
    });
  }

  sendUser() {
    this.token = localStorage.getItem("currentUser");
    this.user = new UserForm(this.form.get("userForm").value);
    console.warn(this.user);

    this.userService.submitUser(this.user).subscribe(id => {
      this.result.login = "Success! [ID: " + id + " ]";
    });
  }
}
