import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn:boolean=false;
  constructor(private authService:AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    this.loggedIn=this.authService.isLoggedIn();
  }
  LogOut()
{
   this.authService.logout();
}
makeReserve()
{
  this.router.navigate(['/createreverve']);
}

}
