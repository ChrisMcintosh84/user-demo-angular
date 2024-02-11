import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {UserModel} from "../_models/user-model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:8080/api/v1/users";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/`)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<UserModel[]>('getUsers', []))
      );
  }

  getUserById(id: BigInt):Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/getById/${id}`)
      .pipe(
        tap(_ => console.log('fetched user')),
        catchError(this.handleError<UserModel>(`getUserById id=${id}`))
      );
  }

  addUser(userModel: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/addNew`, userModel)
      .pipe(
        tap(_ => console.log('added user')),
        catchError(this.handleError<UserModel>(`addUser user=${userModel}`))
      );
  }

  updateUser(userModel: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUrl}/update`, userModel)
      .pipe(
        tap(_ => console.log('updated user')),
        catchError(this.handleError<UserModel>(`updateUser user=${userModel}`))
      );
  }

  deleteUser(id: BigInt): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
      .pipe(
        tap(_ => console.log('deleted user')),
        catchError(this.handleError<UserModel>(`deleteUser id=${id}`))
      );
  }

  searchUsers(searchTerm: string):Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/search/${searchTerm}`)
      .pipe(
        tap(_ => console.log('searching...')),
        catchError(this.handleError<UserModel[]>('searchUser', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
