import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CardComponent } from '@components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Report } from '@interfaces/reports-response';
import { ReportEditDialogComponent } from '@components/report-edit-dialog/report-edit-dialog.component';
import { ReportsService } from '@services/reports/reports.service';
import { SNACKBAR_DURATION } from '@constants/snack-bar.constants';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-pages-reports',
  standalone: true,
  imports: [
    CardComponent,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class ReportsComponent {
  public dialog = inject(MatDialog);
  public _matSnackBar = inject(MatSnackBar);
  private reportsService: ReportsService = inject(ReportsService);
  public reportsList: Report[] = [];

  public reportForm: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    fecha: new FormControl(''),
    idUsuario: new FormControl(0),
    observaciones: new FormControl(''),
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadReports();
  }

  public loadReports(): void {
    this.reportsService.getReports().subscribe((res: Report[]) => {
      console.log(res);
      this.reportsList = res;
    });
  }

  public deleteReport(id: number): void {
    this.reportsService.deleteReport(id).subscribe((res: string) => {
      console.log('Borrando usuario: ', res);
      this.loadReports();
      this._matSnackBar.open('Reporte borrado correctamente.', 'Cerrar', {
        duration: SNACKBAR_DURATION,
      });
    });
  }

  public createReport(): void {
    const newReport: Report = this.reportForm.value;
    this.reportsService.createReport(newReport).subscribe((res: any) => {
      this.loadReports();
      this.reportForm.reset();
      this._matSnackBar.open('Reporte creado correctamente.', 'Cerrar', {
        duration: SNACKBAR_DURATION,
      });
    });
  }

  public openDialog(reportData: Report): void {
    const editDialogRef = this.dialog.open(ReportEditDialogComponent, {
      data: {
        ...reportData,
      },
      minWidth: '75%',
    });

    editDialogRef.afterClosed().subscribe((result) => {
      this.loadReports();
      this._matSnackBar.open('Reporte actualizado correctamente.', 'Cerrar', {
        duration: SNACKBAR_DURATION,
      });
    });
  }
}
