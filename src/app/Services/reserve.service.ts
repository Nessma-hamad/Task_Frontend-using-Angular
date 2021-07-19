import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Reserve } from '../Models/Reserve';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {
  _url="http://localhost:47596/api/Reserve";
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private http: HttpClient) { }
  addNewReserve(reserve:Reserve): Observable<Reserve> {
    return this.http.post<Reserve>(this._url, reserve)
      .pipe(
        tap(() =>  {
          this._refreshNeeded$.next();
        })
      )
    }
  getAllReserves():Observable<Reserve[]>
  {
    return this.http.get<Reserve[]>(this._url).pipe(
      catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }
  getReserveById(id: number): Observable<Reserve> {
    let url = `http://localhost:47596/api/Reserve/${id}`;
    return this.http.get<Reserve>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  getReserveByUSerId(userid: string): Observable<Reserve> {
    let url = `http://localhost:47596/api/Reserve/GetReserveByUserID?userID=${userid}`;
    return this.http.get<Reserve>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  updateReserve(id: number, reserveToUpdate: Reserve): Observable<Reserve>
   {
    const headers = {'content-type': 'application/json'}  
    let url = `http://localhost:47596/api/Reserve/${id}`;
    return this.http.put<Reserve>(url, reserveToUpdate)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
   }
   deleteReserve(id: number): Observable<any> {
    let url = `http://localhost:47596/api/Reserve/${id}`;
    return this.http.delete<any>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
}
