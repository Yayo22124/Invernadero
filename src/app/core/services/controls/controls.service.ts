import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { API_URL } from '@constants/api.constants';
import { Control } from '@interfaces/controls-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  private http: HttpClient = inject(HttpClient);

  getControls(): Observable<Control[]> {
    return this.http.get<Control[]>(`${ API_URL }/controles`);
  }

  getControl( id: number ): Observable<Control> {
    return this.http.get<Control>(`${ API_URL }/control/${ id }`);
  }

  deleteControl(id: number): Observable<string> {
    return this.http
      .delete<string>(`${ API_URL }/control/${ id }`)
      .pipe(catchError((error) => of(`control ${ id }, borrado.`)));
  }

  createControl(newControl: Control): Observable<Control> {
    return this.http.post<Control>(`${ API_URL }/control`, newControl);
  }

  updateControl( id: number, updatedControl: Control): Observable<Control> {
    console.log(updatedControl);

    return this.http.put<Control>(`${ API_URL }/control/${id}`, updatedControl);
  }
}
