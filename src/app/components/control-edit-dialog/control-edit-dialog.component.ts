import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { Control } from '@interfaces/controls-response';
import { ControlsService } from '@services/controls/controls.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-control-edit-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './control-edit-dialog.component.html',
  styleUrl: './control-edit-dialog.component.scss'
})
export class ControlEditDialogComponent {
  public controlData: Control = inject(MAT_DIALOG_DATA);
  private controlsService: ControlsService = inject(ControlsService);

  public editControlForm: FormGroup = new FormGroup({
    fecha: new FormControl(this.controlData.fecha),
    sensorHumedad: new FormControl(this.controlData.sensorHumedad),
    sensorTemperatura: new FormControl(this.controlData.sensorTemperatura),
  });

  public updateControl(id: number ): void {
    const updatedControl: Control = this.editControlForm.value;

    this.controlsService.updateControl(id, updatedControl).subscribe((res: any) => {
      console.log(res);
    });
  }
}
