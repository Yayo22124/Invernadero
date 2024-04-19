import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { API_URL } from '@constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { User } from '@interfaces/users-response';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http: HttpClient = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${ API_URL }/usuarios`);
  }

  getUser( id: number ): Observable<User> {
    return this.http.get<User>(`${ API_URL }/usuario/${ id }`);
  }

  deleteUser(id: number): Observable<string> {
    return this.http
      .delete<string>(`${ API_URL }/usuario/${ id }`)
      .pipe(catchError((error) => of(`Usuario ${ id }, borrado.`)));
  }

  createUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${ API_URL }/usuario`, newUser);
  }

  updateUser( id: number, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${ API_URL }/usuario/${id}`, updatedUser);
  }
}
