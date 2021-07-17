import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  userModel=new Iuser('','','','','');
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.resetForm();
  }
 
  
  resetForm(form? : NgForm){
    if(form !=null)
      form.reset();
    this.userModel= {
      userName : '',
      password : '',
      email:'',
      confirmpassword :'',
      Phone:''
    }
  }
  errorMsg='';
  OnSubmit(form : NgForm){
    this.userService.registerAdmin(this.userModel).subscribe(
      userData=>
      {
        console.log(userData);
        this.router.navigate(['/login']);
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      }

    );
  }
}
