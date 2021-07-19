import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Meal } from 'src/app/Models/Meal';
import { MealService } from 'src/app/Services/meal.service';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.css']
})
export class CreateMealComponent implements OnInit {

  meal=new Meal(0,'',0);
  public meals:Meal[]=[];
  
  
    constructor(private mealService:MealService,private router: Router) { }
  
    ngOnInit(): void {
    
     
      this.mealService.getAllMeals().subscribe(
        data=>
        {
          this.meals=data;
        }
      )
     
    }
    
   
    errorMsg='';
    AddnewMeal(form : NgForm)
    {
      console.log(this.meal)
       this.mealService.addNewMeal(this.meal).subscribe(
        data => {
          console.log(data)
          console.log(this.meal)
          this.router.navigate(['/adminpage']); 
          
        },
        error=>
        {
         this.errorMsg = error;
        }
       )
    }
    
    SaveEditMeal(form : NgForm)
    {
       this.mealService.updateMeal(this.meal.id,this.meal).subscribe(
        data => {
          this.meal=data;
         
        },
        error=>
        {
         this.errorMsg = error;
        }
       )
      }
     
      // pagination
      counter(i: number) {
        return new Array(i);
      }
      

}
