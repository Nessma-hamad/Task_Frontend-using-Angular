import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/Models/ILogin';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoggedUser:ILogin=new ILogin('','');
  invalidLogin: boolean =false;
 

  constructor(private accountservice:AuthenticationService,private router: Router) { }
    
  
  ngOnInit(): void {
    
   
  }

  signIn(formuser:any) {  
    

    this.accountservice.login(this.LoggedUser)  
          .subscribe(
              data => {
                  console.log(data);  
                  this.router.navigate(['/home']); 
                  console.log(this.accountservice.getRole());
                  if(this.accountservice.getRole()=="User")
                  {
                    console.log(this.accountservice.getRole());
                    this.router.navigate(['/home']);
                  }
                  else if(this.accountservice.getRole()=="Admin")
                  {
                    console.log(this.accountservice.getRole());
                    this.router.navigate(['/adminpage']);
                  }
              },
              error => {
                  console.log(error);
                  this.invalidLogin=true;
              });
  } 

}
