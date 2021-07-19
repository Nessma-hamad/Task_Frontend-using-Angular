import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Meal } from 'src/app/Models/Meal';
import { Reserve } from 'src/app/Models/Reserve';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { MealService } from 'src/app/Services/meal.service';
import { ReserveService } from 'src/app/Services/reserve.service';

@Component({
  selector: 'app-create-reserve',
  templateUrl: './create-reserve.component.html',
  styleUrls: ['./create-reserve.component.css']
})
export class CreateReserveComponent implements OnInit {

  public meals:Meal[]=[];
  userReserve:Reserve={id:0,number_of_guests:0,date:new Date,special_requests:'',userID:''};
  
  constructor(private reserveService:ReserveService,private userServise:AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    
  }

  
  OnSubmit(userform:NgForm)
  {
    this.userReserve.userID=this.userServise.getUserId();
    
    console.log(this.userReserve);

    this.reserveService.addNewReserve(this.userReserve).subscribe(
      data=>
      {
        console.log("Done")
        this.router.navigate(['/completreserve']); 
      },
      err=>
      {
        console.log(err)
      }
      
    )
  }
}
