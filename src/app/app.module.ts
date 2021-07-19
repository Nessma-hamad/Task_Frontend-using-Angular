import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminPageComponent } from './Components/Admin/admin-page/admin-page.component';
import { AdminRegisterComponent } from './Components/Admin/admin-register/admin-register.component';
import { HomeComponent } from './Components/home/home.component';
import { CreateMealComponent } from './Components/create-meal/create-meal.component';
import { CreateReserveComponent } from './Components/create-reserve/create-reserve.component';
import { ShowReserveComponent } from './Components/show-reserve/show-reserve.component';
import { ChooseMealComponent } from './Components/choose-meal/choose-meal.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminPageComponent,
    AdminRegisterComponent,
    HomeComponent,
    CreateMealComponent,
    CreateReserveComponent,
    ShowReserveComponent,
    ChooseMealComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  
    FormsModule,
   
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
