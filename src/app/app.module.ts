import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './Guard/LoginGuard';
import { AuthService } from './Guard/AuthService';
import { CommonService } from './service/common.service';
import { InterceptorInterceptor } from './Interceptor/interceptor.interceptor';

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule, HttpClientModule, ReactiveFormsModule],
    providers: [LoginGuard, AuthService, CommonService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule { }
