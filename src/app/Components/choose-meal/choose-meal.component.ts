import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from 'src/app/Models/Meal';
import { Reserve } from 'src/app/Models/Reserve';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { MealService } from 'src/app/Services/meal.service';
import { ReserveService } from 'src/app/Services/reserve.service';

@Component({
  selector: 'app-choose-meal',
  templateUrl: './choose-meal.component.html',
  styleUrls: ['./choose-meal.component.css']
})
export class ChooseMealComponent implements OnInit {

  public meals:Meal[]=[];
  public Usermeals:Meal[]=[]; 
  userID:string="";
  meal=new Meal(0,'',0);
  userReserve:Reserve={id:0,number_of_guests:0,date:new Date,special_requests:'',userID:''};
  
  constructor(private router: Router,private mealService:MealService,private userServise:AuthenticationService,private reserveService:ReserveService) { }

  ngOnInit(): void {
    this.userID=this.userServise.getUserId();
    this.reserveService.getReserveByUSerId(this.userID).subscribe(
      data=>
      {
        this.userReserve=data;
        console.log(data.id)
        console.log(data.number_of_guests)
        console.log(data);
        console.log(this.userReserve);
        
      }
    )
    this.mealService.getAllMeals().subscribe(
      data=>
      {
        this.meals=data;
      }
    )
  }

  addMeal(mealid:number)
  {
    this.mealService.getMealById(mealid).subscribe(
      data=>
      {
        this.meal=data;
        
        this.Usermeals.push(this.meal)
        this.meal.reserveID=this.userReserve.id;
        console.log(this.meal)
        this.mealService.updateMeal(mealid,this.meal).subscribe(
          data=>{
            console.log("updated meal"+data);
          }
        )

      }
    )
  }
  completReserve()
  {
    if(this.Usermeals!=null)
    {
      this.router.navigate(['/home']);
    }
    else{
      alert("You should Choose one Meal At least")
    }
  }
}
