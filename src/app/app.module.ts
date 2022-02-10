import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { InterceptorService } from './services/interceptor.service';
import { HeaderMenuComponent } from './nav/header-menu/header-menu.component';
import { LoaderComponent } from './nav/loader/loader.component';
import { SideMenuComponent } from './nav/side-menu/side-menu.component';
import { ToastMessagesComponent } from './nav/toast-messages/toast-messages.component';
import { UserProfileComponent } from './nav/user-profile/user-profile.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    HeaderMenuComponent,
    LoaderComponent,
    SideMenuComponent,
    ToastMessagesComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FileUploadModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
