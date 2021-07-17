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

  meal=new Meal(0,'');
  mealList:Meal[]=[];
  hasmeal:boolean=false;
  mealForm!: FormGroup;
    mealsCount:number=0;
    pageSize:number = 4;
    currentPageNumber:number = 1;
    numberOfPages:number=0; 
    isLoading:boolean=true;
    constructor(private mealService:MealService,private router: Router) { }
  
    ngOnInit(): void {
      // this.brandService.refreshNeeded$.subscribe(()=>{
      //   this.returnAllBrands();
      // })
      // this.returnAllBrands();
     
     
      this.resetform();
    }
    returnAllMeals()
    {
       this.mealService.getAllMeals().subscribe(
        serviceData=>
        {
          if(serviceData.length>0)
          {
             this.mealList=serviceData;
             this.hasmeal=true;
          }
        },
        errorResponse=>
        {
         this.errorMsg=errorResponse;
        })
    }
    resetform(form? : NgForm){
      if(form !=null)
        form.reset();
      this.meal= {
        name : '',
        id:0
      }
    }
    init(){
     
     
      this.resetform();
    }
    errorMsg='';
    AddnewMeal(form : NgForm)
    {
       this.mealService.addNewMeal(this.meal).subscribe(
        data => {
          this.meal=data;
          this.router.navigate(['/adminpage']); 
          this.init();
        },
        error=>
        {
         this.errorMsg = error;
        }
       )
    }
    deleteMeal(mealId:number)
    {
      if (confirm("Are you sure you want to delete this Brand ?")) {
        this.mealService.deleteMeal(mealId).subscribe(
          data => {
            this.mealService.getAllMeals().subscribe(
              meals=>
              {
                this.mealList=meals;
                this.init();
                console.log(meals.length);
                console.log(meals[0]);
              }
            )
          },
          error=>
          {
           this.errorMsg = error;
          }
         )
      }
       
    }
    updateMeal(mealId:number, meals:Meal)
    {
      this.mealService.updateMeal(mealId,meals).subscribe(
        data => {
          
          this.meal=data;
          this.mealForm.setValue({
            name: data.name
          });
          
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
          this.init();
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
