import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { UserComponent } from "./user/user.component";
import { LoginComponent } from "./login/login.component";
import { FormComponent } from './form/form.component';
import { MenuTopComponent } from './menu-top/menu-top.component';
import { AboutComponent } from './about/about.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [AppComponent, UserComponent, LoginComponent, FormComponent, MenuTopComponent, AboutComponent, ChatComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
