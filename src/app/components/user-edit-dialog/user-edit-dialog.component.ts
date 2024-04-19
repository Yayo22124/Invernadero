import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { User } from '@interfaces/users-response';
import { UsersService } from '@services/users/users.service';

@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.scss',
})
export class UserEditDialogComponent {
  public userData: User = inject(MAT_DIALOG_DATA);
  private usersService: UsersService = inject(UsersService);

  public editUserForm: FormGroup = new FormGroup({
    nombre: new FormControl(this.userData.nombre),
    apellidoPaterno: new FormControl(this.userData.apellidoPaterno),
    apellidoMaterno: new FormControl(this.userData.apellidoMaterno),
    tipo: new FormControl(this.userData.tipo),
  });

  public updateUser(id: number ): void {
    const updatedUser: User = this.editUserForm.value;

    this.usersService.updateUser(id, updatedUser).subscribe((res: any) => {
      console.log(res);
    });
  }
}
