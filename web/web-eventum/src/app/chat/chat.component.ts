import { Component, OnInit } from "@angular/core";
import { UserService } from "../user/user.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  messageText: String;
  messageArray = [];
  constructor(private userService: UserService) {}

  ngOnInit() {}

  sendMessage(message) {
    this.messageArray.push({ msg: message });
    this.messageText = null;
    this.userService
      .sendMessage({
        msg: message
      })
      .subscribe(data => {
        if (data) {
          this.messageArray.push(data);
        }
      });
  }
}
