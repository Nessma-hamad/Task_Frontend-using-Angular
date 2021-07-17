import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  adminName:string="";
  constructor(private authenticate:AuthenticationService) { }

  ngOnInit(): void {
    this.adminName=this.authenticate.getUserName();
    console.log(this.adminName);
  }
  LogOut()
{
   this.authenticate.logout();
}

}
