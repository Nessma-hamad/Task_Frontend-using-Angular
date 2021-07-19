import { Component, OnInit } from '@angular/core';
import { Reserve } from 'src/app/Models/Reserve';
import { Iuser } from 'src/app/Models/User';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ReserveService } from 'src/app/Services/reserve.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  adminName:string="";
  public users:any[]=[];
  found:boolean=false;
  public reseves:Reserve[]=[];
  constructor(private authenticate:AuthenticationService,private reserveService:ReserveService,private userService:UserService) { }

  ngOnInit(): void {
    this.adminName=this.authenticate.getUserName();
    console.log(this.adminName);
    this.reserveService.getAllReserves().subscribe(
      data=>
      {
        this.reseves=data;
        data.forEach(element => {
          this.getUserName(element.userID)

        });

      }
    )
  }
  LogOut()
{
   this.authenticate.logout();
}
getUserName(userID:string)
  {
    this.found=false
    this.userService.getUserByid(userID).subscribe(
  
 
      data => {
       
       
        if(this.users.length==0)
        {
          let username={
            userName:data.userName,
            userID:userID
          }
          this.users.push(username);
          console.log("frist time") 
        }
        else 
        {
          this.users.forEach(min=>
            {
              if(data.userName==min.userName)
              {
                this.found=true
                console.log("asd")
              }
            
              
            })
 
            if(this.found==false)
            {
              let username={
                userName:data.userName,
                userID:userID
              }
              this.users.push(username);
                console.log("second time")
                
            }
          
        } 
  },
 
    )
  }

}
