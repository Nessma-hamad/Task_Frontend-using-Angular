import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './Components/Admin/admin-page/admin-page.component';
import { AdminRegisterComponent } from './Components/Admin/admin-register/admin-register.component';
import { CreateMealComponent } from './Components/create-meal/create-meal.component';
import { CreateReserveComponent } from './Components/create-reserve/create-reserve.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ShowReserveComponent } from './Components/show-reserve/show-reserve.component';

const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'adminpage',component:AdminPageComponent},
  {path:'registeradmin',component:AdminRegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'createmeal',component:CreateMealComponent},
  {path:'createreverve',component:CreateReserveComponent},
  {path:'showreverve',component:ShowReserveComponent},
  { path: "", redirectTo: "/home", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
