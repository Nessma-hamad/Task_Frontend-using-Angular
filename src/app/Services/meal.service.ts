import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Meal } from '../Models/Meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  _url="http://localhost:47596/api/Meals";
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private http: HttpClient) { }
  addNewMeal(meal:Meal): Observable<Meal> {
    return this.http.post<Meal>(this._url, meal)
      .pipe(
        tap(() =>  {
          this._refreshNeeded$.next();
        })
      )
    }
  getAllMeals():Observable<Meal[]>
  {
    return this.http.get<Meal[]>(this._url).pipe(
      catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }
  getMealById(id: number): Observable<Meal> {
    let url = `http://localhost:47596/api/Meals/${id}`;
    return this.http.get<Meal>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  updateMeal(id: number, mealToUpdate: Meal): Observable<Meal>
   {
    const headers = {'content-type': 'application/json'}  
    let url = `http://localhost:47596/api/Meals/${id}`;
    return this.http.put<Meal>(url, mealToUpdate)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
   }
   deleteMeal(id: number): Observable<any> {
    let url = `http://localhost:47596/api/Meals/${id}`;
    return this.http.delete<any>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
}
