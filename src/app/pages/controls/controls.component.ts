import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CardComponent } from '@components/card/card.component';
import { Control } from '@interfaces/controls-response';
import { ControlEditDialogComponent } from '@components/control-edit-dialog/control-edit-dialog.component';
import { ControlsService } from '@services/controls/controls.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_DURATION } from '@constants/snack-bar.constants';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-pages-controls',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    CardComponent
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class ControlsComponent {
  public dialog = inject(MatDialog);
  public _matSnackBar = inject(MatSnackBar);
  private controlsService: ControlsService = inject(ControlsService);
  public controlsList: Control[] = [];

  public controlForm: FormGroup = new FormGroup({
    fecha: new FormControl(''),
    sensorHumedad: new FormControl(0),
    sensorTemperatura: new FormControl(0),
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadControls();
  }

  public loadControls(): void {
    this.controlsService.getControls().subscribe((res: Control[]) => {
      console.log(res);
      this.controlsList = res;
    });
  }

  public deleteControl(id: number): void {
    this.controlsService.deleteControl(id).subscribe((res: string) => {
      console.log('Borrando usuario: ', res);
      this.loadControls();
      this._matSnackBar.open('Control borrado correctamente.', 'Cerrar', {
        duration: SNACKBAR_DURATION,
      });
    });
  }

  public createControl(): void {
    const newControl: Control = this.controlForm.value;
    this.controlsService.createControl(newControl).subscribe((res: any) => {
      this.loadControls();
      this.controlForm.reset();
      this._matSnackBar.open('Control creado correctamente.', 'Cerrar', {
        duration: SNACKBAR_DURATION,
      });
    });
  }

  public openDialog(controlData: Control): void {
    const editDialogRef = this.dialog.open(ControlEditDialogComponent, {
      data: {
        ...controlData,
      },
      minWidth: '75%',
    });

    editDialogRef.afterClosed().subscribe((result) => {
      this.loadControls();
      this._matSnackBar.open('Control actualizado correctamente.', 'Cerrar', {
        duration: SNACKBAR_DURATION,
      });
    });
  }
}
