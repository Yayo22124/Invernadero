import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Report } from '@interfaces/reports-response';
import { ReportsService } from '@services/reports/reports.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-report-edit-dialog',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './report-edit-dialog.component.html',
  styleUrl: './report-edit-dialog.component.scss'
})
export class ReportEditDialogComponent {
  public reportData: Report = inject(MAT_DIALOG_DATA);
  private reportsService: ReportsService = inject(ReportsService);

  public editReportForm: FormGroup = new FormGroup({
    nombre: new FormControl(this.reportData.nombre),
    fecha: new FormControl(this.reportData.fecha),
    idUsuario: new FormControl(this.reportData.idUsuario),
    observaciones: new FormControl(this.reportData.observaciones),
  });

  public updateReport(id: number ): void {
    const updatedReport: Report = this.editReportForm.value;

    this.reportsService.updateReport(id, updatedReport).subscribe((res: any) => {
      console.log(res);
    });
  }
}
