import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILogin } from '../Models/ILogin';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiController } from '../Models/ApiController';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Accept': '*/*'
    })
  }
  
  constructor(
    private _http:HttpClient,
    private router: Router,
    
    ) { }

  login(credentials:ILogin):Observable<any>
   {
     const body={
      email: credentials.email,
      password: credentials.password,
      grant_type:'password'
    }
    console.log(body);
    return this._http.post(`${ApiController.Account_URL}`,body)
    .pipe(map(res => {
      console.log(res);
      console.log("login")
      this.saveToken(res);
      console.log("login")
  }));
   }
   private saveToken(authResult:any) {
    const expiresAt = authResult.token.expiration;
    console.log(authResult);
    localStorage.setItem('token', authResult.token.token);
   localStorage.setItem("expires_at", JSON.stringify(expiresAt));

   
   }  

  
public isLoggedIn() {
    if(localStorage.getItem('token')){
        let token =<string> localStorage.getItem('token');

        let jwtData =token.split('.')[1]

        let decodedJwtJsonData = window.atob(jwtData)

        let decodedJwtData = JSON.parse(decodedJwtJsonData)

        let expirationDateInMills = decodedJwtData.exp * 1000;

        let todayDateInMills = new Date().getTime();

        if (expirationDateInMills >= todayDateInMills)
            return true;
        
    }
    return false;
}

  
  getRole():string {
      if(localStorage.getItem('token')){
          let token =<string> localStorage.getItem('token');

          let jwtData = token.split('.')[1]

          let decodedJwtJsonData = window.atob(jwtData)

          let decodedJwtData = JSON.parse(decodedJwtJsonData)
          let role=decodedJwtData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          return role;
      }
      return "No Role";
    }
    
  getUserId(){
      if(localStorage.getItem('token')){
          let token =<string> localStorage.getItem('token');

          let jwtData =token.split('.')[1]

          let decodedJwtJsonData = window.atob(jwtData)

          let decodedJwtData = JSON.parse(decodedJwtJsonData)
          let userID=decodedJwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          return userID;
      }
      return null;
  }
  getUserName(){
    if(localStorage.getItem('token')){
        let token =<string> localStorage.getItem('token');

        let jwtData = token.split('.')[1]

        let decodedJwtJsonData = window.atob(jwtData)

        let decodedJwtData = JSON.parse(decodedJwtJsonData)
        let name=decodedJwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        return name;
    }
    return null;
}
 getUserEmail(){
  if(localStorage.getItem('token')){
    let token =<string> localStorage.getItem('token');

    let jwtData = token.split('.')[1]

    let decodedJwtJsonData = window.atob(jwtData)

    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    let email=decodedJwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    return email;
}
  return null;
 }
 logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("count");
  localStorage.removeItem("countwishlist");
  localStorage.removeItem("expires_at");
  this.router.navigate(['/login']);
}
isLoggedOut() {
  return !this.isLoggedIn();
}
}
