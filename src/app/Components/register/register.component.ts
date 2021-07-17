import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
declare var $:any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
    this.userService.registerUser(this.userModel).subscribe(
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
