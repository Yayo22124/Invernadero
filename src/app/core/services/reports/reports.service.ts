import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { API_URL } from '@constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { Report } from '@interfaces/reports-response';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private http: HttpClient = inject(HttpClient);

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${ API_URL }/reportes`);
  }

  getReport( id: number ): Observable<Report> {
    return this.http.get<Report>(`${ API_URL }/reporte/${ id }`);
  }

  deleteReport(id: number): Observable<string> {
    return this.http
      .delete<string>(`${ API_URL }/reporte/${ id }`)
      .pipe(catchError((error) => of(`reporte ${ id }, borrado.`)));
  }

  createReport(newReport: Report): Observable<Report> {
    return this.http.post<Report>(`${ API_URL }/reporte`, newReport);
  }

  updateReport( id: number, updatedReport: Report): Observable<Report> {
    console.log(updatedReport);

    return this.http.put<Report>(`${ API_URL }/reporte/${id}`, updatedReport);
  }
}
