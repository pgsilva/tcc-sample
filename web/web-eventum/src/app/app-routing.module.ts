import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserComponent } from "./user/user.component";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from './about/about.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: "", component: UserComponent },
  { path: "about", component: AboutComponent },
  { path: "chat", component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
